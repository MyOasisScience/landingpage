"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

function CollapsibleSection({ title, children, isOpen, onToggle }: CollapsibleSectionProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-all duration-200 cursor-pointer group border-l-2 border-transparent hover:border-l-gray-300"
      >
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">{title}</h3>
        <div className="flex items-center space-x-2">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function HowItWorksCard() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Stay on top of new research": false,
    "Track citation milestones in real-time": false,
    "Monitor industry developments": false,
    "Follow social chatter": false,
    "Get actionable insights": false,
  })

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return (
    <div className="text-gray-900 space-y-6">
      {/* Step 1 */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-3">
          1. Tell us what you&apos;re working on
        </h2>
        <p className="text-sm text-gray-800 leading-relaxed">
          We&apos;ll reach out to understand your focus, goals, and what insights matter most to you.
        </p>
      </div>

      {/* Step 2 */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          2. We build your custom weekly debrief
        </h2>
        
        <div className="space-y-4">
          {/* Step 2.1 */}
          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-lime-200 mx-auto sm:mx-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="text-center sm:text-left sm:ml-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Analyse your interests</h3>
              <p className="text-sm text-gray-800 leading-relaxed">We analyse your brief and goals to understand what matters to you.</p>
            </div>
          </div>

          {/* Step 2.2 */}
          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-lime-200 mx-auto sm:mx-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="text-center sm:text-left sm:ml-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Curate relevant content</h3>
              <p className="text-sm text-gray-800 leading-relaxed">Our AI scans thousands of scientific papers, industry reports, and social threads to find the most relevant insights for you.</p>
            </div>
          </div>

          {/* Step 2.3 */}
          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-lime-200 mx-auto sm:mx-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-center sm:text-left sm:ml-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Deliver insights</h3>
              <p className="text-sm text-gray-800 leading-relaxed">Each week, we deliver a newsletter summarising key developments, trends, and discussions in your field.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50/30">
        <CollapsibleSection
          title="Stay on top of new research"
          isOpen={openSections["Stay on top of new research"]}
          onToggle={() => toggleSection("Stay on top of new research")}
        >
          <div className="text-gray-800">
            <p className="text-sm text-gray-800 leading-relaxed mb-4">We surface the most relevant new papers and preprints in your field.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] bg-gradient-to-br from-white to-gray-100 border border-gray-200 shadow-md rounded-lg overflow-hidden hover:scale-[1.02] transition-transform">
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-sky-100 text-sky-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm shadow-sm font-medium">
                    🧠 Medical AI
                  </div>
                  <Image 
                    src="/images/Paper1Title.png" 
                    alt="Research Paper 1" 
                    width={300}
                    height={200}
                    className="w-full h-full object-contain p-2 sm:p-3"
                  />
                </div>
                <div className="text-center mt-1 sm:mt-2">
                  <div className="text-xs font-semibold text-gray-700 bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-sm border border-gray-200 inline-block">
                    AI boosts Parkinson&apos;s treatment
                  </div>
                </div>
              </div>
              
              <div>
                <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] bg-gradient-to-br from-white to-gray-100 border border-gray-200 shadow-md rounded-lg overflow-hidden hover:scale-[1.02] transition-transform">
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-emerald-100 text-emerald-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm shadow-sm font-medium">
                    🌱 Sustainability
                  </div>
                  <Image 
                    src="/images/Paper2Title.png" 
                    alt="Research Paper 2" 
                    width={300}
                    height={200}
                    className="w-full h-full object-contain p-2 sm:p-3"
                  />
                </div>
                <div className="text-center mt-1 sm:mt-2">
                  <div className="text-xs font-semibold text-gray-700 bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-sm border border-gray-200 inline-block">
                    Carbon capture breakthrough
                  </div>
                </div>
              </div>
              
              <div>
                <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] bg-gradient-to-br from-white to-gray-100 border border-gray-200 shadow-md rounded-lg overflow-hidden hover:scale-[1.02] transition-transform">
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-purple-100 text-purple-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm shadow-sm font-medium">
                    🤖 AI Research
                  </div>
                  <Image 
                    src="/images/Paper3Title.png" 
                    alt="Research Paper 3" 
                    width={300}
                    height={200}
                    className="w-full h-full object-contain p-2 sm:p-3"
                  />
                </div>
                <div className="text-center mt-1 sm:mt-2">
                  <div className="text-xs font-semibold text-gray-700 bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-sm border border-gray-200 inline-block">
                    AI scientist passes peer review
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Track citation milestones in real-time"
          isOpen={openSections["Track citation milestones in real-time"]}
          onToggle={() => toggleSection("Track citation milestones in real-time")}
        >
          <div className="text-gray-800">
            <p className="text-sm text-gray-800 leading-relaxed mb-4">We notify you when relevant research hits key citation or impact thresholds.</p>
            <div className="space-y-4">
              {/* Self-Injury Study */}
              <div className="bg-gradient-to-br from-white to-gray-100 p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium mb-2">
                      🧠 Clinical Research
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1 leading-tight">
                      &ldquo;Self-Injury in College Youth&rdquo;
                    </h3>
                    <p className="text-xs text-gray-800">Whitlock et al. • Pediatrics • 2006</p>
                    <p className="text-xs text-gray-700 mt-2 italic">
                      Crossed 1,000 citations — now a clinical and policy reference point.
                    </p>
                  </div>
                  <div className="text-right ml-2 sm:ml-4 flex-shrink-0">
                    <div className="text-lg sm:text-xl font-bold text-blue-600">1,524</div>
                    <div className="text-xs sm:text-sm text-gray-500">citations</div>
                  </div>
                </div>
              </div>

              {/* Laser Wakefield Acceleration */}
              <div className="bg-gradient-to-br from-white to-gray-100 p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium mb-2">
                      ⚛️ Physics
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1 leading-tight">
                      &ldquo;Laser Wakefield Electron Beams&rdquo;
                    </h3>
                    <p className="text-xs text-gray-800">Nature • 2004</p>
                    <p className="text-xs text-gray-700 mt-2 italic">
                      Surpassed 1,000 citations — now a core method in compact particle physics.
                    </p>
                  </div>
                  <div className="text-right ml-2 sm:ml-4 flex-shrink-0">
                    <div className="text-lg sm:text-xl font-bold text-green-600">2,699</div>
                    <div className="text-xs sm:text-sm text-gray-500">citations</div>
                  </div>
                </div>
              </div>

              {/* Addison Chemistry Paper */}
              <div className="bg-gradient-to-br from-white to-gray-100 p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium mb-2">
                      🧪 Chemistry
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1 leading-tight">
                      &ldquo;Copper(II) Complex Structures&rdquo;
                    </h3>
                    <p className="text-xs text-gray-800">Addison et al. • J. Chem. Soc. • 1984</p>
                    <p className="text-xs text-gray-700 mt-2 italic">
                      Exceeded 5,000 citations — textbook-standard in materials chemistry.
                    </p>
                  </div>
                  <div className="text-right ml-2 sm:ml-4 flex-shrink-0">
                    <div className="text-lg sm:text-xl font-bold text-purple-600">6,721</div>
                    <div className="text-xs sm:text-sm text-gray-500">citations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Monitor industry developments"
          isOpen={openSections["Monitor industry developments"]}
          onToggle={() => toggleSection("Monitor industry developments")}
        >
          <div className="text-gray-800">
            <p className="text-sm text-gray-800 leading-relaxed mb-4">We surface major industry research and reports.</p>
            <div className="flex flex-row justify-center space-x-4 sm:space-x-8">
              <div className="w-32 sm:w-auto sm:max-w-sm">
                <Image 
                  src="/images/IndustryReport1.png" 
                  alt="Industry Report 1" 
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="w-32 sm:w-auto sm:max-w-sm">
                <Image 
                  src="/images/IndustryReport2.png" 
                  alt="Industry Report 2" 
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Follow social chatter"
          isOpen={openSections["Follow social chatter"]}
          onToggle={() => toggleSection("Follow social chatter")}
        >
          <div className="text-gray-800">
            <p className="text-sm text-gray-800 leading-relaxed mb-4">We track discussions and debates across academic social media.</p>
            <div className="flex justify-center">
              <Image 
                src="/images/Social_media_umap.png" 
                alt="Social Media Map" 
                width={600}
                height={400}
                className="w-full max-w-2xl h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Get actionable insights"
          isOpen={openSections["Get actionable insights"]}
          onToggle={() => toggleSection("Get actionable insights")}
        >
          <div className="text-gray-800">
            <p className="text-sm text-gray-800 leading-relaxed mb-4">Every week, we recommend specific next steps based on your focus areas and current developments.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 border-none rounded-lg shadow-sm p-3 sm:p-4">
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium mb-2">
                  for an AI startup founder
                </div>
                <p className="text-blue-800 text-sm font-medium leading-relaxed">
                  <strong>Prioritise access to real clinical data and strengthen your benchmarking strategy now</strong>
                  <br />
                  → New evidence shows synthetic data can cause dangerous hallucinations in medical AI, raising red flags for regulators and partners alike.
                </p>
              </div>
              
              <div className="bg-green-50 border-none rounded-lg shadow-sm p-3 sm:p-4">
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium mb-2">
                  for a policy maker
                </div>
                <p className="text-green-800 text-sm font-medium leading-relaxed">
                  <strong>Commission or expand national AI governance frameworks that mandate transparency and auditing of high-risk models</strong>
                  <br />
                  → Nearly a third of recent AI laws worldwide now require it, putting your jurisdiction at risk of lagging or misalignment.
                </p>
              </div>
              
              <div className="bg-purple-50 border-none rounded-lg shadow-sm p-3 sm:p-4">
                <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium mb-2">
                  for a climate journalist
                </div>
                <p className="text-purple-800 text-sm font-medium leading-relaxed">
                  <strong>Investigate how &ldquo;strategic disruption&rdquo; narratives are undermining trust in climate solutions</strong>
                  <br />
                  → Emerging evidence shows false claims now target renewables and green tech—not climate science itself—quietly stalling progress and reshaping public opinion.
                </p>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Step 3 */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-3">
          3. Read and Refine
        </h2>
        <p className="text-sm text-gray-800 leading-relaxed">
          Reply with feedback any time, and we&apos;ll fine-tune your brief to make sure it delivers exactly what&apos;s useful to you.
        </p>
      </div>
    </div>
  )
} 