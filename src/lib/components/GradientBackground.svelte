<div class="gradient-bg fixed inset-0 w-screen h-screen">
  <svg class="svgBlur hidden">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>
  <div class="gradients-container">
    <div class="g1"></div>
    <div class="g2"></div>
    <div class="g3"></div>
    <div class="g4"></div>
    <div class="g5"></div>
  </div>
</div>

<style>
  .gradient-bg {
    --color1: 79, 70, 229;
    --color2: 99, 102, 241;
    --color3: 139, 92, 246;
    --color4: 236, 72, 153;
    --color5: 244, 63, 94;
    --circle-size: 50%;
    --blending: hard-light;
  }

  .gradients-container {
    filter: url(#goo) blur(40px);
    width: 100vw;
    height: 100vh;
  }

  .g1, .g2, .g3, .g4, .g5 {
    position: absolute;
    width: var(--circle-size);
    height: var(--circle-size);
    mix-blend-mode: var(--blending);
    border-radius: 50%;
  }

  .g1 { background: radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%) no-repeat; animation: moveVertical 30s ease infinite; }
  .g2 { background: radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%) no-repeat; animation: moveInCircle 20s reverse infinite; }
  .g3 { background: radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%) no-repeat; animation: moveInCircle 40s linear infinite; }
  .g4 { background: radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%) no-repeat; animation: moveHorizontal 40s ease infinite; }
  .g5 { background: radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%) no-repeat; animation: moveInCircle 20s ease infinite; }

  @keyframes moveInCircle { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes moveVertical { 0% { transform: translateY(-50%); } 50% { transform: translateY(50%); } 100% { transform: translateY(-50%); } }
  @keyframes moveHorizontal { 0% { transform: translateX(-50%); } 50% { transform: translateX(50%); } 100% { transform: translateX(-50%); } }
</style>