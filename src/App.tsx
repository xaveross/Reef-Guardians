import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Progress } from './components/ui/progress';
import { Waves, Fish, Anchor, AlertTriangle, Sprout, ChevronRight, Hammer, Thermometer, Ship, Microscope, Flame, Shield, TreePine, Bike, Droplets, GraduationCap } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

type Choice = {
  text: string;
  consequence: string;
  healthChange: number;
};

type Scenario = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  choices: Choice[];
};

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Tourism Company Proposal",
    description: "A hotel investor wants to construct a large beachfront resort close to the fringing reef.",
    icon: <Anchor className="w-8 h-8" />,
    choices: [
      {
        text: "Approve construction with no restrictions",
        consequence: "Sedimentation, pollution, and coral smothering damage the reef significantly.",
        healthChange: -25
      },
      {
        text: "Approve only after requiring an Environmental Impact Assessment, sediment barriers, and setback rules",
        consequence: "Balanced decision that minimizes environmental impact while supporting tourism, reflecting Jamaica's environmental legislation (NRCA).",
        healthChange: -5
      },
      {
        text: "Reject construction and promote eco-tourism",
        consequence: "Sustainable cultural tourism protects the reef and supports local communities.",
        healthChange: 5
      }
    ]
  },
  {
    id: 2,
    title: "Community Fishing Meeting",
    description: "Local fishers complain about declining fish populations near the fringing reef.",
    icon: <Fish className="w-8 h-8" />,
    choices: [
      {
        text: "Allow more fish pots on the reef",
        consequence: "Overfishing disrupts the cultural and economic balance of the ecosystem.",
        healthChange: -15
      },
      {
        text: "Introduce 'reef rest' seasons and educate fishers",
        consequence: "Culturally sensitive and sustainable fishing practices help the reef recover.",
        healthChange: 10
      },
      {
        text: "Ban all fishing in reef areas",
        consequence: "Hurts fishing culture and economy, leading to community backlash.",
        healthChange: -5
      }
    ]
  },
  {
    id: 3,
    title: "Hurricane Approaching",
    description: "A Category 5 hurricane is approaching.",
    icon: <AlertTriangle className="w-8 h-8" />,
    choices: [
      {
        text: "Wait and hope for the best",
        consequence: "Debris, anchors and wave power damage to the reef structures.",
        healthChange: -10
      },
      {
        text: "Set up mooring buoys and restricting boating and anchoring",
        consequence: "Protects reef structures from additional damage during the storm.",
        healthChange: 5
      },
      {
        text: "Organize coral rescue & nursery expansion effort before and after the hurricane",
        consequence: "Community restoration efforts save valuable coral specimens.",
        healthChange: 15
      }
    ]
  },
  {
    id: 4,
    title: "Beach Pollution Problem",
    description: "Tourists and locals often leave trash on the beach.",
    icon: <Waves className="w-8 h-8" />,
    choices: [
      {
        text: "Do nothing",
        consequence: "Plastic and trash block sunlight and harm the reef ecosystem.",
        healthChange: -25
      },
      {
        text: "Establish recycling initiatives, and host beach cleanups",
        consequence: "Caribbean cultural response: community environmental action.",
        healthChange: 10
      },
      {
        text: "Ban all tourism activities in the area",
        consequence: "Loss of conservation funding hurts long-term reef protection efforts.",
        healthChange: -10
      }
    ]
  },
  {
    id: 5,
    title: "Land-Based Pollution",
    description: "Nearby farms use fertilizers containing nitrogen and phosphorus, and runoff flows into the lagoon.",
    icon: <Sprout className="w-8 h-8" />,
    choices: [
      {
        text: "Ignore it",
        consequence: "Nutrient pollution causes algal blooms that smother and kill corals.",
        healthChange: -20
      },
      {
        text: "Train farmers to use buffer zones, drip irrigation, and fewer chemicals",
        consequence: "Sustainable farming practices protect both livelihoods and the reef.",
        healthChange: 10
      },
      {
        text: "Ban all fertilizer use immediately",
        consequence: "Reduces the food production and creates tension within the community.",
        healthChange: -10
      }
    ]
  },
  {
    id: 6,
    title: "Coral Mining for Construction",
    description: "Local contractors want to mine dead coral rubble for cheap building material.",
    icon: <Hammer className="w-8 h-8" />,
    choices: [
      {
        text: "Approve coral extraction",
        consequence: "Removes reef structure, weakening coastal protection and erasing cultural heritage linked to traditional fishing grounds.",
        healthChange: -15
      },
      {
        text: "Allow only limited extraction from already degraded areas with permits",
        consequence: "Minimizes damage but still affects ecosystem recovery.",
        healthChange: -5
      },
      {
        text: "Ban coral mining and promote alternatives (limestone blocks, recycled materials)",
        consequence: "Protects reef geology and preserves cultural coastal landscapes.",
        healthChange: 10
      }
    ]
  },
  {
    id: 7,
    title: "Climate Change & Coral Bleaching",
    description: "Water temperatures rise 2°C above normal, causing bleaching.",
    icon: <Thermometer className="w-8 h-8" />,
    choices: [
      {
        text: "Ignore the bleaching event",
        consequence: "Long-term stress kills corals and affects Caribbean cultural traditions tied to the sea.",
        healthChange: -20
      },
      {
        text: "Launch community-led shading structures, coral cooling experiments, and monitoring",
        consequence: "Cultural stewardship strengthens environmental identity.",
        healthChange: 10
      },
      {
        text: "Tell communities to stop all uses of the reef",
        consequence: "Prevents stress but hurts livelihoods.",
        healthChange: -5
      }
    ]
  },
  {
    id: 8,
    title: "Cruise Ship Anchoring",
    description: "A cruise ship company wants to anchor near the reef because mooring buoys are 'too far.'",
    icon: <Ship className="w-8 h-8" />,
    choices: [
      {
        text: "Allow free anchoring",
        consequence: "Anchor chains crush corals—major damage.",
        healthChange: -25
      },
      {
        text: "Approve only if the company installs deep-water mooring buoys",
        consequence: "Protects the reef while supporting tourism revenue.",
        healthChange: -5
      },
      {
        text: "Redirect cruise tours to less sensitive sites & promote cultural heritage tours",
        consequence: "Protects the environment and preserves local cultural tourism.",
        healthChange: 5
      }
    ]
  },
  {
    id: 9,
    title: "Medical Breakthrough",
    description: "A pharmaceutical company discovers that reef organisms contain compounds that could potentially treat cancer and viral infections.",
    icon: <Microscope className="w-8 h-8" />,
    choices: [
      {
        text: "Allow unrestricted harvesting of corals and reef organisms",
        consequence: "Unsustainable extraction destroys biodiversity, removing species that Caribbean science, culture, and future medicine depend on. Loss of reef organisms also disrupts the ecosystem.",
        healthChange: -20
      },
      {
        text: "Approve a controlled research permit with NEPA oversight, strict quotas, and coral nursery requirements",
        consequence: "Balances scientific advancement with cultural and environmental stewardship. Protects the reef while allowing important medical discoveries.",
        healthChange: 10
      },
      {
        text: "Reject all research activities",
        consequence: "Protects the reef physically but prevents Caribbean countries from benefiting culturally or economically from biomedical innovation tied to reef ecosystems.",
        healthChange: -5
      }
    ]
  },
  {
    id: 10,
    title: "Tourist Behavior",
    description: "Snorkel tours report tourists standing on corals.",
    icon: <Waves className="w-8 h-8" />,
    choices: [
      {
        text: "Ignore it",
        consequence: "Physical damage to corals continues unchecked, devastating the ecosystem.",
        healthChange: -20
      },
      {
        text: "Train guides & install 'no-touch' signage",
        consequence: "Education and awareness reduce harmful behaviors while maintaining tourism.",
        healthChange: 5
      },
      {
        text: "Ban snorkelling completely",
        consequence: "Loss of conservation funding hurts long-term reef protection efforts.",
        healthChange: -5
      }
    ]
  }
];

const scenarioImages = [
  "https://images.unsplash.com/photo-1632930777765-7a7e65ebcff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHJlZWYlMjBob3RlbCUyMHRvdXJpc218ZW58MXx8fHwxNzYzMjQwMzA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1759773533571-16c133e10ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwYm9hdCUyMGNvbW11bml0eXxlbnwxfHx8fDE3NjMyNDAzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1600342916035-6eaca6511b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodXJyaWNhbmUlMjBzdG9ybSUyMG9jZWFufGVufDF8fHx8MTc2MzI0MDMwOXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1582395880240-8a89060981de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm9ya2VsaW5nJTIwY29yYWwlMjByZWVmfGVufDF8fHx8MTc2MzI0MDMwOXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1723134085909-19da487ac9bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHBvbGx1dGlvbiUyMGZhcm1pbmd8ZW58MXx8fHwxNzYzMjQwMzEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1703860844787-b7ee76e5107d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHJ1YmJsZSUyMGNvbnN0cnVjdGlvbiUyMG1hdGVyaWFsfGVufDF8fHx8MTc2MzMzMjk0MHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1701674307893-79d1701ef5e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGVhY2hlZCUyMHdoaXRlJTIwY29yYWwlMjByZWVmfGVufDF8fHx8MTc2MzMzMjk0MXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1586070944750-6d818b11a323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVpc2UlMjBzaGlwJTIwYW5jaG9yJTIwb2NlYW58ZW58MXx8fHwxNzYzMzMyOTQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1761789966464-14e03fcd483f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpbmUlMjByZXNlYXJjaCUyMGNvcmFsJTIwc2NpZW5jZXxlbnwxfHx8fDE3NjMzMzI5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1582395880240-8a89060981de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm9ya2VsaW5nJTIwY29yYWwlMjByZWVmfGVufDF8fHx8MTc2MzI0MDMwOXww&ixlib=rb-4.1.0&q=80&w=1080",,
];

// Consequence background images
const positiveConsequenceImages = [
  "https://images.unsplash.com/photo-1692285736030-03fb3ba9cd18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwdmlicmFudCUyMGNvcmFsJTIwcmVlZnxlbnwxfHx8fDE3NjMyNDQwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1637308106535-21ce9f08cfbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGNvbnNlcnZhdGlvbiUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzYzMjQ0MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
];

const negativeConsequenceImages = [
  "https://images.unsplash.com/photo-1694064416708-86643bd67335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkJTIwYmxlYWNoZWQlMjBjb3JhbCUyMHJlZWZ8ZW58MXx8fHwxNzYzMjQ0MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1589817327469-f4d9e3f1e640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xsdXRlZCUyMG9jZWFuJTIwd2F0ZXJ8ZW58MXx8fHwxNzYzMjQ0MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
];

const neutralConsequenceImage = "https://images.unsplash.com/photo-1761590700229-0ba5b9e9d842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwY29yYWwlMjBlY29zeXN0ZW18ZW58MXx8fHwxNzYzMjM1OTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080";

// Sound effect helper functions
const playSound = (type: 'click' | 'positive' | 'negative' | 'neutral' | 'win' | 'lose') => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  switch(type) {
    case 'click':
      oscillator.frequency.value = 400;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
      break;
    case 'positive':
      oscillator.frequency.value = 523.25; // C5
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      oscillator.start(audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.3); // G5
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
    case 'negative':
      oscillator.frequency.value = 300;
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      oscillator.start(audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.4);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      oscillator.stop(audioContext.currentTime + 0.4);
      break;
    case 'neutral':
      oscillator.frequency.value = 350;
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
      break;
    case 'win':
      // Victory fanfare
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3);
        osc.start(audioContext.currentTime + i * 0.15);
        osc.stop(audioContext.currentTime + i * 0.15 + 0.3);
      });
      break;
    case 'lose':
      // Descending sad tones
      [400, 350, 300, 250].forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.2 + 0.4);
        osc.start(audioContext.currentTime + i * 0.2);
        osc.stop(audioContext.currentTime + i * 0.2 + 0.4);
      });
      break;
  }
};

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [reefHealth, setReefHealth] = useState(100);
  const [showConsequence, setShowConsequence] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [displayHealth, setDisplayHealth] = useState(100);

  const handleChoice = (choice: Choice) => {
    playSound('click');
    setSelectedChoice(choice);
    setShowConsequence(true);
    
    // Play consequence sound after a short delay
    setTimeout(() => {
      if (choice.healthChange > 0) {
        playSound('positive');
      } else if (choice.healthChange < 0) {
        playSound('negative');
      } else {
        playSound('neutral');
      }
    }, 300);
  };

  const handleContinue = () => {
    playSound('click');
    
    if (selectedChoice) {
      const newHealth = Math.max(0, Math.min(100, reefHealth + selectedChoice.healthChange));
      setReefHealth(newHealth);
      setDisplayHealth(newHealth);
    }

    if (currentLevel < scenarios.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setShowConsequence(false);
      setSelectedChoice(null);
    } else {
      setGameEnded(true);
      // Play end game sound
      setTimeout(() => {
        const finalHealth = Math.max(0, Math.min(100, reefHealth + (selectedChoice?.healthChange || 0)));
        if (finalHealth >= 70) {
          playSound('win');
        } else {
          playSound('lose');
        }
      }, 500);
    }
  };

  const resetGame = () => {
    playSound('click');
    setCurrentLevel(0);
    setReefHealth(100);
    setDisplayHealth(100);
    setShowConsequence(false);
    setSelectedChoice(null);
    setGameStarted(false);
    setGameEnded(false);
  };

  const getHealthColor = () => {
    if (reefHealth >= 70) return 'bg-green-500';
    if (reefHealth >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getEnding = () => {
    if (reefHealth >= 70) {
      return {
        title: "🎉 Success! The Reef Thrives!",
        description: "The reef thrives! Fish return, cultural traditions strengthen, and the community succeeds. Your balanced approach to conservation has created a sustainable future for both the ecosystem and the people who depend on it.",
        color: "border-green-500"
      };
    } else if (reefHealth >= 40) {
      return {
        title: "⚠️ Survival, But At What Cost?",
        description: "The reef survives, but weakened. Cultural and economic activities become unstable. While not a complete disaster, the reef's future remains uncertain and will require careful management.",
        color: "border-yellow-500"
      };
    } else {
      return {
        title: "❌ Ecological Collapse",
        description: "The reef collapses. Storms hit harder, fish vanish, and cultural practices decline. The ecosystem has been pushed beyond its recovery point, with devastating consequences for the community.",
        color: "border-red-500"
      };
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <Card className="max-w-2xl w-full border-4 border-cyan-400 shadow-2xl shadow-cyan-500/50 bg-gradient-to-b from-slate-900 to-slate-800">
            <CardHeader className="text-center space-y-4 border-b-4 border-cyan-400/30">
              <motion.div 
                className="flex justify-center"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/50">
                  <Waves className="w-16 h-16 text-white" />
                </div>
              </motion.div>
              <CardTitle className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                REEF GUARDIAN
              </CardTitle>
              <p className="text-cyan-200 text-sm tracking-wider uppercase">Protect the Reef</p>
              <CardDescription className="text-lg text-slate-300">
                As a community leader, you must make critical decisions to protect your coral reef. 
                Balance environmental conservation, cultural traditions, and economic needs across 10 challenging scenarios.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="bg-gradient-to-br from-cyan-950/50 to-blue-950/50 p-6 rounded-lg border-2 border-cyan-500/30">
                <h3 className="mb-4 text-cyan-300 tracking-wide uppercase text-sm">Mission Briefing:</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    Make choices that affect reef health (starting at 100%)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    Consider environmental, cultural, and economic impacts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    Reach the end with reef health ≥70% for the best outcome
                  </li>
                </ul>
              </div>
              <Button 
                onClick={() => {
                  playSound('click');
                  setGameStarted(true);
                }} 
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-500/50 h-14 text-lg tracking-wide uppercase"
                size="lg"
              >
                Start Mission
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (gameEnded) {
    const ending = getEnding();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className={`border-4 ${ending.color} shadow-2xl bg-gradient-to-b from-slate-900 to-slate-800`}>
            <CardHeader className="text-center space-y-4 border-b-4 border-current/30">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: 0.2 
                }}
              >
                <CardTitle className="text-3xl text-white">{ending.title}</CardTitle>
              </motion.div>
              <div className="space-y-3">
                <p className="text-sm text-slate-400 uppercase tracking-wider">Final Reef Health</p>
                <div className="space-y-3 bg-slate-950/50 p-4 rounded-lg">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ transformOrigin: 'left' }}
                  >
                    <Progress value={reefHealth} className="h-8 border-2 border-slate-700" />
                  </motion.div>
                  <motion.p 
                    className={`text-4xl ${reefHealth >= 70 ? 'text-green-400' : reefHealth >= 40 ? 'text-yellow-400' : 'text-red-400'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    {reefHealth}%
                  </motion.p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <motion.p 
                className="text-center text-slate-300 text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {ending.description}
              </motion.p>
              <Button 
                onClick={resetGame} 
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-500/50 h-14 text-lg tracking-wide uppercase"
                size="lg"
              >
                Play Again
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const currentScenario = scenarios[currentLevel];

  // Consequence screen
  if (showConsequence && selectedChoice) {
    const consequenceImage = selectedChoice.healthChange > 0 
      ? positiveConsequenceImages[Math.floor(Math.random() * positiveConsequenceImages.length)]
      : selectedChoice.healthChange < 0
      ? negativeConsequenceImages[Math.floor(Math.random() * negativeConsequenceImages.length)]
      : neutralConsequenceImage;

    const newHealth = Math.max(0, Math.min(100, reefHealth + selectedChoice.healthChange));

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={consequenceImage}
            alt="Consequence"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${
            selectedChoice.healthChange > 0 
              ? 'bg-gradient-to-t from-green-900/90 via-green-900/60 to-green-900/40'
              : selectedChoice.healthChange < 0
              ? 'bg-gradient-to-t from-red-900/90 via-red-900/60 to-red-900/40'
              : 'bg-gradient-to-t from-blue-900/90 via-blue-900/60 to-blue-900/40'
          }`} />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="max-w-3xl w-full space-y-8"
          >
            {/* Impact Banner */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-center p-6 rounded-lg border-4 ${
                selectedChoice.healthChange > 0 
                  ? 'bg-green-500/20 border-green-400'
                  : selectedChoice.healthChange < 0
                  ? 'bg-red-500/20 border-red-400'
                  : 'bg-blue-500/20 border-blue-400'
              } backdrop-blur-sm`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
                className="mb-4"
              >
                <p className="text-white uppercase tracking-widest text-sm mb-2">Impact</p>
                <div className={`text-6xl ${
                  selectedChoice.healthChange > 0 
                    ? 'text-green-300'
                    : selectedChoice.healthChange < 0
                    ? 'text-red-300'
                    : 'text-blue-300'
                }`}>
                  {selectedChoice.healthChange > 0 ? '+' : ''}{selectedChoice.healthChange}%
                </div>
              </motion.div>
            </motion.div>

            {/* Consequence Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-900/80 backdrop-blur-md p-8 rounded-lg border-4 border-slate-700"
            >
              <h3 className="text-cyan-300 uppercase tracking-wider text-sm mb-4">Consequence</h3>
              <p className="text-white text-xl leading-relaxed">
                {selectedChoice.consequence}
              </p>
            </motion.div>

            {/* Health Bar */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-slate-900/80 backdrop-blur-md p-6 rounded-lg border-4 border-slate-700 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Waves className="w-8 h-8 text-cyan-400" />
                  <span className="text-white uppercase tracking-wider">Reef Health</span>
                </div>
                <motion.div
                  initial={{ scale: 2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 1 }}
                  className="flex items-center gap-4"
                >
                  <span className={`text-3xl ${
                    reefHealth >= 70 ? 'text-green-400' : 
                    reefHealth >= 40 ? 'text-yellow-400' : 
                    'text-red-400'
                  }`}>
                    {reefHealth}%
                  </span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="text-2xl text-cyan-400"
                  >
                    →
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className={`text-3xl ${
                      newHealth >= 70 ? 'text-green-400' : 
                      newHealth >= 40 ? 'text-yellow-400' : 
                      'text-red-400'
                    }`}
                  >
                    {newHealth}%
                  </motion.span>
                </motion.div>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
                style={{ transformOrigin: 'left' }}
              >
                <Progress value={newHealth} className="h-6 border-2 border-slate-600" />
              </motion.div>
            </motion.div>

            {/* Continue Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <Button 
                onClick={handleContinue} 
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-4 border-cyan-400 shadow-2xl shadow-cyan-500/50 h-16 text-xl tracking-wide uppercase"
                size="lg"
              >
                {currentLevel < scenarios.length - 1 ? 'Continue to Next Level' : 'See Final Results'}
                <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen p-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header with Health Bar */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-4 border-cyan-400 shadow-2xl shadow-cyan-500/30 bg-gradient-to-br from-slate-800 to-slate-900">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-600 rounded-lg">
                      <Waves className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white uppercase tracking-wider">Reef Health</span>
                  </div>
                  <motion.span 
                    key={displayHealth}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`text-3xl ${displayHealth >= 70 ? 'text-green-400' : displayHealth >= 40 ? 'text-yellow-400' : 'text-red-400'}`}
                  >
                    {displayHealth}%
                  </motion.span>
                </div>
                <Progress value={displayHealth} className="h-6 border-2 border-slate-700" />
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-cyan-300 uppercase tracking-wider text-sm">
                      Level {currentLevel + 1} / {scenarios.length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Scenario Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLevel}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-4 border-cyan-400 shadow-2xl shadow-cyan-500/30 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                {/* Scenario Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={scenarioImages[currentLevel]}
                    alt={currentScenario.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/50"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {currentScenario.icon}
                      </motion.div>
                      <div>
                        <h2 className="text-white text-2xl tracking-wide">{currentScenario.title}</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-transparent mt-2" />
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader className="border-t-4 border-cyan-400/30">
                  <CardDescription className="text-lg text-slate-300">{currentScenario.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pb-8">
                  <p className="text-cyan-300 uppercase tracking-wider text-sm mb-2">Select Your Action:</p>
                  {currentScenario.choices.map((choice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => handleChoice(choice)}
                        variant="outline"
                        className="w-full justify-start h-auto p-5 text-left border-2 border-cyan-600/50 hover:border-cyan-400 bg-slate-800/50 hover:bg-cyan-950/50 text-white hover:text-white transition-all group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 via-cyan-600/10 to-cyan-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="mr-4 text-2xl text-cyan-400 group-hover:text-cyan-300 relative z-10">{String.fromCharCode(65 + index)}</span>
                        <span className="flex-1 relative z-10">{choice.text}</span>
                        <ChevronRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity relative z-10" />
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}