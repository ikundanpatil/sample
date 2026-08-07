import React, { useState } from 'react';
import {
  Share2,
  ShieldCheck,
  BookOpen,
  Table as TableIcon,
  Sparkles,
  Download,
  CheckCircle2,
} from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

const ReportCard = ({ report }) => {
  const [exported, setExported] = useState(false);

  const handleDownloadPDF = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${report.topic.toLowerCase().replace(/\s+/g, '_')}_report.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="w-full bg-[#18181B] border border-zinc-800 rounded-[14px] p-6 md:p-8 shadow-2xl space-y-8">
      {/* Report Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="info" glow icon={Sparkles}>
              Verified Deep Research
            </Badge>
            <span className="text-xs text-zinc-400 font-mono">{report.date}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
            {report.title}
          </h1>
          <p className="text-sm text-zinc-400">{report.subtitle}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" icon={Share2} onClick={handleExport}>
            {exported ? 'Link Copied!' : 'Share'}
          </Button>
          <Button variant="primary" size="sm" icon={Download} onClick={handleDownloadPDF}>
            Download PDF
          </Button>
        </div>
      </div>

      {/* Metrics & Confidence Gauge */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-[14px] bg-[#09090B] border border-zinc-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-400 font-medium">Confidence Score</span>
          <span className="text-xl font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-white" />
            {report.confidenceScore}%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-400 font-medium">Verified Sources</span>
          <span className="text-xl font-bold text-zinc-200">{report.citationCount} Papers & Repos</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-400 font-medium">Reading Time</span>
          <span className="text-xl font-bold text-zinc-200">{report.readingTime}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-400 font-medium">Research Depth</span>
          <span className="text-xl font-bold text-white">{report.depth}</span>
        </div>
      </div>

      {/* 1. Executive Summary */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
          <BookOpen className="w-5 h-5 text-white" />
          Executive Summary
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line bg-[#09090B] p-4 rounded-xl border border-zinc-800">
          {report.executiveSummary}
        </p>
      </section>

      {/* 2. Key Findings */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
          <Sparkles className="w-5 h-5 text-white" />
          Key Research Findings
        </h3>
        <div className="grid gap-4">
          {report.findings.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#09090B] border border-zinc-800 space-y-1.5">
              <h4 className="text-sm font-semibold text-zinc-100">{item.heading}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Comparison Table */}
      {report.comparisonTable && report.comparisonTable.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
            <TableIcon className="w-5 h-5 text-white" />
            Framework Performance Comparison Matrix
          </h3>
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#09090B]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-zinc-900 text-zinc-400 font-semibold border-b border-zinc-800 uppercase">
                  <th className="py-3 px-4">Framework</th>
                  <th className="py-3 px-4">Reasoning Engine</th>
                  <th className="py-3 px-4">Latency</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Cost / Task</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {report.comparisonTable.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx === 0 ? 'bg-zinc-800/80 font-medium text-white' : 'hover:bg-zinc-900/60'}>
                    <td className="py-3 px-4 font-bold">{row.framework}</td>
                    <td className="py-3 px-4">{row.reasoning}</td>
                    <td className="py-3 px-4 font-mono">{row.speed}</td>
                    <td className="py-3 px-4 font-semibold text-white">{row.accuracy}</td>
                    <td className="py-3 px-4 font-mono text-zinc-400">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 4. Strategic Recommendations */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
          <CheckCircle2 className="w-5 h-5 text-white" />
          Strategic Recommendations
        </h3>
        <ul className="space-y-2 text-xs text-zinc-300">
          {report.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#09090B] border border-zinc-800">
              <span className="w-5 h-5 rounded-full bg-zinc-800 text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5 border border-zinc-700">
                {idx + 1}
              </span>
              <span className="leading-snug">{rec}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. References & Sources */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
          <BookOpen className="w-5 h-5 text-white" />
          Cited Primary Sources & Whitepapers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {report.references.map((ref, idx) => (
            <a
              key={idx}
              href={ref.link}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-[#09090B] border border-zinc-800 hover:border-zinc-500 transition-all flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors leading-snug">
                  {ref.title}
                </p>
                <p className="text-[11px] text-zinc-400 font-mono">{ref.source}</p>
              </div>
              <Badge variant="cyan" size="sm">
                {ref.rating}
              </Badge>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReportCard;
