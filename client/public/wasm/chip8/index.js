(() => {
  let audioCtx = null;
  let oscillator = null;
  let gainNode = null;
  let audioInitialized = false;

  function initAudio() {
    if (audioInitialized) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.1;
    gainNode.connect(audioCtx.destination);
    audioInitialized = true;
  }

  function toggleBeep(active) {
    if (!audioInitialized) return;
    if (active && !oscillator) {
      oscillator = audioCtx.createOscillator();
      oscillator.type = "square";
      oscillator.frequency.value = 440;
      oscillator.connect(gainNode);
      oscillator.start();
    } else if (!active && oscillator) {
      oscillator.stop();
      oscillator.disconnect();
      oscillator = null;
    }
  }

  document.addEventListener("keydown", initAudio, { once: true });
  document.addEventListener("mousedown", initAudio, { once: true });
  document.addEventListener("touchstart", initAudio, { once: true });

  Chip8Emulator().then((Module) => {
    Module.keyState = new Array(16).fill(0);
    Module.toggleBeep = toggleBeep;

    const keyMap = {
      'x': 0x0, '1': 0x1, '2': 0x2, '3': 0x3,
      'q': 0x4, 'w': 0x5, 'e': 0x6, 'a': 0x7,
      's': 0x8, 'd': 0x9, 'z': 0xA, 'c': 0xB,
      '4': 0xC, 'r': 0xD, 'f': 0xE, 'v': 0xF
    };

    document.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();
      if (key in keyMap) Module.keyState[keyMap[key]] = 1;
    });

    document.addEventListener("keyup", (e) => {
      const key = e.key.toLowerCase();
      if (key in keyMap) Module.keyState[keyMap[key]] = 0;
    });

    Module.renderToCanvas = function (pixels) {
      const canvas = document.getElementById("screen");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const scale = 10;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      for (let y = 0; y < 32; y++) {
        for (let x = 0; x < 64; x++) {
          if (pixels[y * 64 + x]) {
            ctx.fillRect(x * scale, y * scale, scale, scale);
          }
        }
      }
    };

    let lastTime = performance.now();
    const targetHz = 700;
    const msPerCycle = 1000 / targetHz;
    let accumulator = 0;
    let isRunning = false;

    function runLoop(now) {
      if (!isRunning) return;
      let delta = now - lastTime;
      lastTime = now;
      accumulator += delta;

      while (accumulator >= msPerCycle) {
        Module.ccall("wasm_cycle", null, ["number"], [1]);
        accumulator -= msPerCycle;
      }

      requestAnimationFrame(runLoop);
    }

    function startEmulation() {
      if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        requestAnimationFrame(runLoop);
      }
    }

    function loadROM(rom) {
      const ptr = Module._malloc(rom.length);
      Module.HEAPU8.set(rom, ptr);
      const result = Module.ccall('wasm_load_rom', 'number', ['number', 'number'], [ptr, rom.length]);
      Module._free(ptr);

      if (result !== 0) {
        alert("ROM failed to load.");
      } else {
        startEmulation();
      }
    }

    async function fetchROM(path) {
      try {
        const res = await fetch(path, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = await res.arrayBuffer();
        loadROM(new Uint8Array(buffer));
      } catch (e) {
        console.error("[CHIP8] ROM load error:", e);
      }
    }

    document.getElementById("rom-picker").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => loadROM(new Uint8Array(reader.result));
      reader.readAsArrayBuffer(file);
    });

    async function populateROMButtons() {
      const container = document.getElementById("rom-links");
      try {
        const res = await fetch("/wasm/chip8/roms/index.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.text();
        const roms = JSON.parse(raw).filter(name => name.toLowerCase() !== "index.json");
        container.innerHTML = "";
        if (roms.length === 0) {
          container.innerHTML = "<p>No ROMs found.</p>";
          return;
        }
        for (const filename of roms) {
          const btn = document.createElement("button");
          btn.textContent = filename;
          btn.type = "button";
          btn.addEventListener("click", () => fetchROM(`/wasm/chip8/roms/${filename}`));
          container.appendChild(btn);
        }
      } catch (err) {
        container.innerHTML = "<p>Error loading ROMs.</p>";
        console.error("[CHIP8] Failed to load ROM list:", err);
      }
    }

    Module.ccall("wasm_init");
    populateROMButtons();

    // 💡 Provide cleanup
    window.stopChip8 = () => {
      isRunning = false;
      toggleBeep(false);
    };
  });
})();
