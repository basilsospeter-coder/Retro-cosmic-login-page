document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialize Canvas Reactive Universe Background
    const canvas = document.getElementById("universe-canvas");
    const ctx = canvas.getContext("2d");
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 180;
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, velocity: 0 };

    class EnergyParticle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * 2 + 0.5; // Depth multiplier
            this.radius = Math.random() * 2 * this.z;
            this.baseSpeedX = (Math.random() * 0.4 - 0.2) * this.z;
            this.baseSpeedY = (Math.random() * -0.6 - 0.2) * this.z; // Flow upwards naturally
            this.hue = Math.random() > 0.5 ? 190 : 280; // Split Cyan / Purple Hues
            this.alpha = Math.random() * 0.5 + 0.2;
        }
        update() {
            // Distortion effect based on proximity to mouse coordinates
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 250) {
                let force = (250 - dist) / 250;
                this.x -= (dx / dist) * force * 3 * this.z;
                this.y -= (dy / dist) * force * 3 * this.z;
            }

            this.x += this.baseSpeedX;
            this.y += this.baseSpeedY;

            // Loop edges boundaries safely
            if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                this.reset();
                this.y = height + 10;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${this.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `hsl(${this.hue}, 90%, 65%)`;
            ctx.fill();
        }
    }

    // Populate array
    for (let i = 0; i < particleCount; i++) particles.push(new EnergyParticle());

    // Continuous Canvas Render Engine Loop
    function renderUniverse() {
        ctx.fillStyle = "rgba(2, 2, 5, 0.15)"; // Soft trailing motion frames opacity
        ctx.shadowBlur = 0;
        ctx.fillRect(0, 0, width, height);

        // Compute cursor structural delay vector speeds
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(renderUniverse);
    }
    renderUniverse();

    // 2. Structural Real-Time Assembling Entrance Logic (GSAP Physics)
    const portalTl = gsap.timeline();
    
    portalTl.to("#js-hologram", {
        opacity: 1,
        z: 0,
        scale: 1,
        duration: 1.8,
        ease: "power4.out"
    });

    portalTl.from(".portal-header, .quantum-input, .energy-core", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1.2,
        ease: "elastic.out(1, 0.75)"
    }, "-=1.2");

    // 3. Continuously Evolving Fluid Path Morph Loop
    const morphPath = document.getElementById("morphing-path");
    
    // Arrays representing alternate point configuration matrices for structural fluctuation
    const shapeA = "M20,40 Q220,20 420,40 Q450,270 420,500 Q220,520 20,500 Q-10,270 20,40 Z";
    const shapeB = "M30,35 Q220,35 410,35 Q435,270 425,490 Q220,505 25,505 Q0,270 30,35 Z";

    function runMorphCycle() {
        gsap.to(morphPath, {
            attr: { d: shapeB },
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    }
    runMorphCycle();

    // 4. Kinetic Parallax Tracking Coordinates
    const hologram = document.getElementById("js-hologram");
    
    window.addEventListener("mousemove", (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;

        const rotateX = (e.clientY / height - 0.5) * -25; // Tilt vectors calculation
        const rotateY = (e.clientX / width - 0.5) * 25;

        gsap.to(hologram, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.7,
            ease: "power2.out"
        });
    });

    // 5. Magnetic Core Interaction Logic
    const core = document.getElementById("magnetic-core");
    
    core.addEventListener("mousemove", (e) => {
        const rect = core.getBoundingClientRect();
        const coreX = e.clientX - rect.left - rect.width / 2;
        const coreY = e.clientY - rect.top - rect.height / 2;

        gsap.to(core, {
            x: coreX * 0.4,
            y: coreY * 0.4,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    core.addEventListener("mouseleave", () => {
        gsap.to(core, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    });
    
    core.addEventListener("click", () => {
        // Impact pulse structural flash on click interaction
        gsap.to("#universe-canvas", { backgroundColor: "rgba(0, 242, 254, 0.2)", duration: 0.1, yoyo: true, repeat: 1 });
    });

    // Handle viewport resize matrices adjustments
    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
});