import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const initParticles = async (engine) => {
    await loadSlim(engine); // ✅ NO checkVersion issue
  };

  return (
    <Particles
      init={initParticles}
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        particles: {
          number: { value: 50 },
          color: { value: "#38bdf8" },
          move: { enable: true, speed: 1 },
          links: { enable: true }
        }
      }}
    />
  );
};

export default ParticlesBackground;
