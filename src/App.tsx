/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Clock,
  Sun,
  Moon,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Printer,
  ChevronRight,
  Shield,
  Layers,
  ArrowDown,
  Info,
  Flashlight,
  ExternalLink,
  BookOpen
} from 'lucide-react';

// Navigation chapter items
const CHAPTERS = [
  { id: 'ch1', n: '01', t: '為什麼需要時間與光線風險管理？' },
  { id: 'ch2', n: '02', t: '理解曙暮光：不要只看日出日落' },
  { id: 'ch3', n: '03', t: '摸早黑管理' },
  { id: 'ch4', n: '04', t: '不摸早黑的優勢' },
  { id: 'ch5', n: '05', t: '摸早黑管理方式' },
  { id: 'ch6', n: '06', t: '摸晚黑管理' },
  { id: 'ch7', n: '07', t: '摸晚黑行進管理' },
  { id: 'ch8', n: '08', t: '頭燈與照明風險管理' },
  { id: 'ch9', n: '09', t: '主動摸黑與被動摸黑' },
  { id: 'ch10', n: '10', t: '領隊時間決策模型' },
  { id: 'ch11', n: '11', t: '核心總結' },
];

// Reusable Section Container
function ChapterSection({
  id,
  number,
  title,
  subtitle,
  children,
}: {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border/60 py-14 print-plain"
    >
      <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="rounded-md border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold tracking-[0.25em] text-primary">
          {number}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

// Surface card for content blocks
function Card({
  title,
  eyebrow,
  className = '',
  children,
}: {
  title?: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`surface-card p-6 print-plain ${className}`}>
      {eyebrow && (
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      {title && (
        <h3 className="mb-3 text-lg font-semibold text-foreground">{title}</h3>
      )}
      <div className="space-y-3 text-[15px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

// Sub heading used to introduce a teaching block inside a chapter
function SubHeading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-6 print-plain">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground md:text-2xl">
        {children}
      </h3>
    </div>
  );
}

// Responsive Grid container
function GridContainer({
  children,
  cols = 3,
}: {
  children: React.ReactNode;
  cols?: 2 | 3;
}) {
  return (
    <div
      className={`grid gap-4 ${
        cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {children}
    </div>
  );
}

// Emphasized Blockquote
function QuoteBlock({
  children,
  large = false,
}: {
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <blockquote
      className="relative overflow-hidden rounded-2xl border border-primary/30 p-6 md:p-8 print-plain"
      style={{ backgroundImage: 'var(--gradient-dawn)' }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 -top-6 font-serif text-[7rem] leading-none text-foreground/10 select-none"
      >
        “
      </span>
      <p
        className={`relative font-semibold leading-relaxed text-foreground ${
          large ? 'text-xl md:text-2xl' : 'text-lg'
        }`}
      >
        {children}
      </p>
    </blockquote>
  );
}

// Vertical Steps Flow
function StepFlow({
  steps,
  tone = 'danger',
}: {
  steps: string[];
  tone?: 'danger' | 'safe';
}) {
  const isDanger = tone === 'danger';
  const textColor = isDanger ? 'text-danger' : 'text-safe';
  const borderColor = isDanger ? 'border-danger/40' : 'border-safe/40';

  return (
    <div className="surface-card p-6 print-plain">
      <ol className="flex flex-col items-stretch gap-0">
        {steps.map((step, idx) => (
          <li key={step} className="flex flex-col items-center">
            <div
              className={`w-full rounded-lg border bg-secondary/40 px-4 py-3 text-center text-sm font-medium ${borderColor}`}
            >
              {step}
            </div>
            {idx < steps.length - 1 && (
              <span className={`py-1 text-lg leading-none ${textColor}`}>
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

// Twilight classification Card
function TwilightCard({
  name,
  angle,
  desc,
  tokenClass,
}: {
  name: string;
  angle: string;
  desc: string[];
  tokenClass: string;
}) {
  return (
    <div className="surface-card overflow-hidden print-plain">
      <div className={`h-2 w-full ${tokenClass}`} />
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          <span className="font-mono text-sm font-medium text-primary">
            {angle}
          </span>
        </div>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {desc.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-primary font-bold">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Card for winter / low-temperature content (same Card, accent edge)
function WinterCard({
  title,
  eyebrow = '冬季環境',
  children,
}: {
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      title={title}
      eyebrow={eyebrow}
      className="border-l-4 border-l-primary"
    >
      {children}
    </Card>
  );
}

// Responsive Table with Mobile Card Fallback
function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <>
      {/* Mobile Card Layout */}
      <div className="space-y-3 md:hidden">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="surface-card p-4 print-plain">
            <p className="mb-3 text-[15px] font-semibold text-foreground">
              {row[0]}
            </p>
            <dl className="space-y-2.5">
              {row.slice(1).map((val, cIdx) => (
                <div key={cIdx}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
                    {headers[cIdx + 1]}
                  </dt>
                  <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {val}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop Clean Table Layout */}
      <div className="surface-card hidden overflow-x-auto print-plain md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold tracking-wide text-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="border-t border-border/70 align-top">
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-4 py-3 ${
                      cIdx === 0
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Interactive Checklist component
function ChecklistCard({
  storageKey,
  title,
  items,
}: {
  storageKey: string;
  title: string;
  items: string[];
}) {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`checklist_${storageKey}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  const handleToggle = (item: string) => {
    setCheckedState((prev) => {
      const next = { ...prev, [item]: !prev[item] };
      try {
        localStorage.setItem(`checklist_${storageKey}`, JSON.stringify(next));
      } catch {
        // fallback
      }
      return next;
    });
  };

  const handleReset = () => {
    setCheckedState({});
    try {
      localStorage.removeItem(`checklist_${storageKey}`);
    } catch {
      // fallback
    }
  };

  const completedCount = items.filter((item) => checkedState[item]).length;
  const isAllDone = completedCount === items.length;

  return (
    <div className="surface-card p-6 print-plain">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <CheckCircle2
            className={`w-5 h-5 ${
              isAllDone ? 'text-safe' : 'text-primary'
            }`}
          />
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">
            {completedCount} / {items.length}
          </span>
          {completedCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] font-mono text-muted-foreground hover:text-foreground underline transition-colors"
            >
              重置
            </button>
          )}
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item) => {
          const checked = !!checkedState[item];
          return (
            <li key={item}>
              <button
                type="button"
                onClick={() => handleToggle(item)}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                  checked
                    ? 'border-safe/50 bg-safe/10 text-foreground'
                    : 'border-border bg-secondary/30 text-muted-foreground hover:border-primary/50'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold transition-all ${
                    checked
                      ? 'border-safe bg-safe/30 text-foreground'
                      : 'border-border bg-card'
                  }`}
                >
                  {checked ? '✓' : ''}
                </span>
                <span className={checked ? 'line-through opacity-80' : ''}>
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Case Study Component
function CaseStudy({
  tag,
  title,
  situation,
  mistake,
  lesson,
}: {
  tag: string;
  title: string;
  situation: string;
  mistake: string;
  lesson: string;
}) {
  return (
    <div className="surface-card p-6 print-plain border-l-4 border-l-accent">
      <span className="rounded-md bg-accent/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
        {tag}
      </span>
      <h3 className="mt-3 text-lg font-semibold text-foreground">{title}</h3>
      <dl className="mt-4 space-y-3 text-sm">
        {[
          ['情境', situation],
          ['問題點', mistake],
          ['教學重點', lesson],
        ].map(([label, text]) => (
          <div key={label}>
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              {label}
            </dt>
            <dd className="mt-1 leading-relaxed text-muted-foreground">
              {text}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Official Association Header */}
      <header className="no-print sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          {/* Brand block linking back to amazon-hike.com */}
          <a
            href="https://amazon-hike.com/"
            className="flex items-center gap-3 transition-opacity hover:opacity-85 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors">
                亞馬遜國家山岳協會
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Amazon Alpine Association
              </p>
            </div>
          </a>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://amazon-hike.com/intro"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-md hover:bg-secondary/40 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>登山入門指南</span>
            </a>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/50 bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>列印 / 匯出 PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation Bar */}
      <nav
        aria-label="路徑導覽"
        className="no-print border-b border-border/40 bg-card/25 py-2.5 text-xs"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 md:px-8 text-muted-foreground">
          <a
            href="https://amazon-hike.com/"
            className="hover:text-foreground transition-colors"
          >
            首頁
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
          <a
            href="https://amazon-hike.com/intro"
            className="hover:text-foreground transition-colors"
          >
            登山入門指南
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
          <span className="text-foreground font-medium truncate" aria-current="page">
            登山時間與光線風險管理教案
          </span>
        </div>
      </nav>

      {/* Hero Section with Official Chapter H1 */}
      <section className="relative overflow-hidden border-b border-border/60">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-twilight-ridge.jpg`}
          alt="曙暮光下的高山稜線，隊伍以頭燈行進"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />

        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            <span>Amazon Alpine Association</span>
            <span>·</span>
            <span className="text-muted-foreground">登山入門指南 Chapter 25</span>
          </div>

          <p className="mt-1 text-sm tracking-[0.2em] text-muted-foreground">
            亞馬遜國家山岳協會 官方教材
          </p>

          {/* EXACTLY ONE H1 for the page */}
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            登山時間與光線風險管理教案
          </h1>

          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            從曙暮光、摸早黑到摸晚黑的行程決策，涵蓋一般季節與冬季冰雪環境
          </p>

          {/* Core concept quote banner */}
          <div className="mt-8 max-w-2xl rounded-2xl border border-primary/30 bg-card/70 p-5 backdrop-blur">
            <p className="text-[15px] font-medium leading-relaxed text-foreground">
              「領隊管理的不是黑暗，而是在什麼光線條件下，隊伍是否仍能安全完成下一段路程。」
            </p>
          </div>

          {/* Key tags */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {[
              '領隊教育教材',
              '11 章節',
              '含冬季冰雪環境',
              '決策模型',
              'Checklist',
              '可列印',
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary/40 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        {/* Chapter Quick Jump Navigation */}
        <nav aria-label="章節導覽" className="py-10">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            章節導覽 / Contents
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CHAPTERS.map((ch) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                className="surface-card flex items-center gap-3 p-4 transition-colors hover:border-primary/60 group"
              >
                <span className="font-mono text-sm text-primary group-hover:underline">
                  {ch.n}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {ch.t}
                </span>
              </a>
            ))}
          </div>
        </nav>

        {/* Article Container */}
        <article className="space-y-4">
          {/* Chapter 1 */}
          <ChapterSection
            id="ch1"
            number="第一章"
            title="為什麼需要時間與光線風險管理？"
          >
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              登山中的時間不只是行程安排。時間是一個會同時牽動視覺、地形判斷、身體與天候的變數。
              當我們只把時間視為「幾點出發、幾點到」，就會忽略它其實是風險本身。
            </p>

            <GridContainer cols={3}>
              {[
                ['視覺能力', '光線決定可辨識距離與路跡判讀能力。'],
                ['地形判斷', '低光下坡度、崩塌、岔路的辨識度大幅下降。'],
                ['身體疲勞', '行進時數與睡眠負債直接影響判斷品質。'],
                ['天候變化', '午後對流、夜間降溫都與時間強相關。'],
                ['隊伍效率', '休息次數、隊距控制隨時間逐段惡化。'],
                ['決策餘裕', '越晚，可選方案越少，撤退成本越高。'],
              ].map(([t, desc]) => (
                <Card key={t} title={t}>
                  <p>{desc}</p>
                </Card>
              ))}
            </GridContainer>

            <QuoteBlock>
              時間本身就是風險因子，而不是行程表上的一個數字。
            </QuoteBlock>

            <SubHeading eyebrow="季節差異">
              同一條路線，不同季節不能用同一份時間表
            </SubHeading>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              冬季白天較短，能運用的自然光線時間縮短；低溫與冰雪地形又會讓同樣的里程需要更多時間。
              如果預估只看里程、爬升與過往紀錄，很容易把「理想狀態」當成「今天的狀態」。
            </p>

            <GridContainer cols={3}>
              <WinterCard title="可用光線變短">
                <p>
                  冬季白天較短，自然光線的窗口縮小，行程能消化延誤的餘裕也跟著變少。
                </p>
              </WinterCard>
              <WinterCard title="冰雪與低溫拉長行進時間">
                <p>
                  冰雪、融雪與凍結地面需要更謹慎的踏點與步伐，同一段路所需的時間可能明顯增加。
                </p>
              </WinterCard>
              <WinterCard title="看不見的時間成本">
                <p>
                  穿脫衣物、調整裝備、處理冰雪、休息與補充食物，在低溫下都可能比平常更耗時，而這些時間不會出現在里程表上。
                </p>
              </WinterCard>
              <WinterCard title="過往紀錄只是參考">
                <p>
                  紀錄反映的是當時的季節、天候與地面狀態，不能直接代表今天的路況。
                </p>
              </WinterCard>
              <WinterCard title="以當天實際環境為準">
                <p>
                  里程與爬升只是起點，溫度、地面狀態、隊員狀況與裝備操作效率，都要納入預估。
                </p>
              </WinterCard>
              <WinterCard title="預估要能被校正">
                <p>
                  預留環境變動與操作成本的餘裕，並在行進中用實際速度回頭修正後段預估。
                </p>
              </WinterCard>
            </GridContainer>

            <QuoteBlock>
              時間預估必須反映真實環境，而不是套用理想狀態下的行進速度。
            </QuoteBlock>

            <CaseStudy
              tag="冬季案例 C"
              title="照著夏季紀錄排時間，冬季中段就已經落後"
              situation="領隊依過往夏季紀錄排定各段時間。當天路段有殘雪與結冰，隊員需要更常停下來穿脫衣物、調整手套與處理裝備。"
              mistake="時間表直接沿用理想狀態下的行進速度，沒有把冰雪地形與操作成本算進去。中段落後之後，只能靠壓縮休息、加快步伐追時間。"
              lesson="紀錄只是起點。要用前段的實際速度回頭修正後段預估，落後時重新決定要繼續、調整，還是撤退，而不是靠趕路補回來。"
            />

            <GridContainer cols={2}>
              <Card eyebrow="思考問題" title="越早出發一定越安全嗎？">
                <p>
                  提早出發換來的時間餘裕，是否被睡眠不足、低光導航與低溫所抵銷？安全來自「淨餘裕」，不是出發時刻。
                </p>
              </Card>
              <Card eyebrow="思考問題" title="日落前抵達一定代表安全嗎？">
                <p>
                  若隊伍是以耗盡體力、放棄休息、壓縮確認流程換來的準時，那只是把風險轉移到明天。
                </p>
              </Card>
            </GridContainer>
          </ChapterSection>

          {/* Chapter 2 */}
          <ChapterSection
            id="ch2"
            number="第二章"
            title="理解曙暮光：不要只看日出日落"
          >
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              領隊需要的是一套光線分級，而不是單一時間點。以太陽高度角建立共同語言：
            </p>

            <GridContainer cols={3}>
              <TwilightCard
                name="天文曙暮光"
                angle="-18° ～ -12°"
                tokenClass="bg-astronomical"
                desc={['接近黑暗', '僅靠頭燈行進', '不適合作為主要行進時間']}
              />
              <TwilightCard
                name="航海曙暮光"
                angle="-12° ～ -6°"
                tokenClass="bg-nautical"
                desc={['天空開始變亮', '大型地形輪廓可辨識', '仍需要頭燈']}
              />
              <TwilightCard
                name="民用曙暮光（重要）"
                angle="-6° ～ 0°"
                tokenClass="bg-civil"
                desc={['肉眼可辨識環境', '開始具備有效行進能力', '路跡判讀可行']}
              />
              <TwilightCard
                name="日出／日落"
                angle="0°"
                tokenClass="bg-daylight"
                desc={[
                  '日出不是突然天亮',
                  '日落也不是立即全黑',
                  '真正關鍵是有效可視行進時間',
                ]}
              />
            </GridContainer>

            <ComparisonTable
              headers={['光線分級', '太陽高度', '可視能力', '行進建議']}
              rows={[
                [
                  '天文曙暮光',
                  '-18°～-12°',
                  '近乎全黑',
                  '僅限熟悉、平緩、低風險路段',
                ],
                [
                  '航海曙暮光',
                  '-12°～-6°',
                  '輪廓可見',
                  '可行進，需頭燈與較短隊距',
                ],
                [
                  '民用曙暮光',
                  '-6°～0°',
                  '環境可辨識',
                  '有效行進時間開始／結束',
                ],
                ['白晝', '0° 以上', '完整視覺', '困難地形應安排在此區間'],
              ]}
            />

            <SubHeading eyebrow="冬季的光線窗口">
              日出日落，不等於「看得出地形」
            </SubHeading>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              日出代表太陽到達地平線，不代表地形已經清楚；日落也不代表立刻全黑。冬季白天較短，光線窗口更有限，曙暮光在整份行程中的比重就變高了，必須明確納入規劃。
              而同樣的曙暮光，在不同地形位置的實際可視程度並不相同：
            </p>

            <ComparisonTable
              headers={['地形位置', '曙暮光下的可視特性', '冬季額外提醒']}
              rows={[
                [
                  '開闊稜線',
                  '天空光線容易進入，輪廓與路跡通常較早被辨識',
                  '雪地反光與風勢可能影響辨識與保暖；仍須確認踏面是否結冰',
                ],
                [
                  '森林',
                  '樹冠遮蔽，實際可視程度可能低於天空的亮度',
                  '林下陰影處的積雪或結冰不易察覺，天亮後也可能持續存在',
                ],
                [
                  '峽谷／溪谷',
                  '兩側遮擋，光線進入較慢，也可能較早變暗',
                  '潮濕與低溫環境下，岩面、溪邊與倒木較可能濕滑或結冰',
                ],
                [
                  '背陽坡',
                  '日照條件較差，亮度與升溫都可能較慢',
                  '冰雪停留的時間可能較久，不能以向陽處的狀況推斷',
                ],
              ]}
            />

            <GridContainer cols={2}>
              <WinterCard title="天亮，不等於冰雪消失">
                <p>
                  即使天色已亮、視線改善，冰雪地形仍可能存在辨識與通行風險。日出不是地面立即解凍的時間點。
                </p>
              </WinterCard>
              <WinterCard title="日落，不等於地面立刻結冰">
                <p>
                  日落也不是結冰的時間點。結冰與否取決於氣溫、地表溫度、風、濕度與地面含水量等條件，要以現場觀察為準，而不是套用固定時間。
                </p>
              </WinterCard>
            </GridContainer>

            <QuoteBlock>
              行程規劃應以「有效可視行進時間」為單位，而不是日出日落時刻。
            </QuoteBlock>
          </ChapterSection>

          {/* Chapter 3 */}
          <ChapterSection id="ch3" number="第三章" title="摸早黑管理">
            <GridContainer cols={2}>
              <Card eyebrow="策略目的" title="摸早黑是一種行程策略">
                <ul className="space-y-1.5">
                  <li>· 避免午後雷雨</li>
                  <li>· 增加可用行程時間</li>
                  <li>· 長距離縱走的必要手段</li>
                </ul>
              </Card>
              <Card eyebrow="前提" title="但摸早黑不是沒有成本">
                <p>
                  它把風險從「傍晚」移到「清晨」，而不是消滅風險。成本必須被計算與管理。
                </p>
              </Card>
            </GridContainer>

            <GridContainer cols={3}>
              <Card eyebrow="風險 1" title="生理時鐘">
                <p>過早起床 → 睡眠不足 → 精神下降 → 判斷能力降低。</p>
              </Card>
              <Card eyebrow="風險 2" title="清晨環境">
                <p>溫度最低、濕度高、植被濕潤、路面較滑。</p>
                <p>冬季還可能加上結冰、積雪與凍土，詳見下方冬季段落。</p>
              </Card>
              <Card eyebrow="風險 3" title="導航風險">
                <p>
                  低光環境下路跡不明、岔路容易錯過、地形判斷能力下降。
                </p>
              </Card>
            </GridContainer>

            <Card eyebrow="風險 4" title="摸早黑造成摸晚黑">
              <p>最常被忽略的連鎖反應：</p>
            </Card>

            <StepFlow
              steps={[
                '過度早起',
                '睡眠不足',
                '效率下降',
                '休息增加',
                '速度降低',
                '延誤累積',
                '摸晚黑',
              ]}
              tone="danger"
            />

            <QuoteBlock>錯誤的摸早黑，可能成為摸晚黑的開始。</QuoteBlock>

            <SubHeading eyebrow="冬季摸早黑">
              不只是摸黑，而是可能在冰天雪地之中摸黑行進
            </SubHeading>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              冬季摸早黑，通常是經歷整夜低溫之後，在天亮之前開始行進。黑暗、冰雪、低溫與人體尚未暖開，可能同時存在，風險不是各自獨立，而是疊加在一起。
            </p>

            <GridContainer cols={3}>
              <WinterCard title="整夜低溫後的地面">
                <p>
                  夜間低溫可能使地面結冰，也可能出現積雪、冰面、凍土與凍結的水氣。實際狀態仍取決於氣溫、地表溫度、風與濕度，要以現場觀察為準。
                </p>
              </WinterCard>
              <WinterCard title="黑暗中辨識冰面">
                <p>
                  薄冰、冰面與凍土的起伏，在頭燈下不一定看得出來。頭燈照得到路面，不代表辨識得出所有冰雪風險。
                </p>
              </WinterCard>
              <WinterCard title="身體尚未暖開">
                <p>
                  日出前人體尚未充分暖開，手腳可能僵硬；剛起床、睡眠不足時，協調與判斷也可能還沒恢復。
                </p>
              </WinterCard>
              <WinterCard title="手部與裝備操作">
                <p>
                  厚重衣物與手套會降低操作扣具、拉鍊、手機與 GPS 的效率，原本簡單的動作都可能變慢。
                </p>
              </WinterCard>
              <WinterCard title="穿脫與調整的時間成本">
                <p>
                  手套、衣物、背包與冰雪裝備的調整，在低溫與黑暗中更耗時，要事先算進起登後前段的行程。
                </p>
              </WinterCard>
              <WinterCard title="天亮後冰雪仍在">
                <p>
                  天亮後視線改善，但地面冰雪不代表立即融化。看得見變容易了，通行風險不一定同步下降。
                </p>
              </WinterCard>
            </GridContainer>

            <QuoteBlock>
              摸早黑不是單純提早出發，而是選擇在某種光線、溫度與地面狀態下開始行進。
            </QuoteBlock>

            <Card eyebrow="避免過度簡化" title="早黑不等於一定結冰">
              <p>
                冰雪是否存在、範圍多大、通行難度如何，要靠前一天的天氣與路況資訊，加上起登後的實際觀察來判斷，不能把可能性當成必然結果。
              </p>
            </Card>

            <CaseStudy
              tag="冬季案例 D"
              title="頭燈下順利通過，天亮才發現部分路段結冰"
              situation="冬季清晨，隊伍在頭燈下通過一段稜線下切。當時只覺得路面偏硬、略有反光，隊員以為只是潮濕。"
              mistake="頭燈能照出路徑，卻不容易分辨冰面與濕岩。天亮後回頭看，才發現部分路段其實結冰，背陽處到天亮後仍未解凍。隊伍是靠運氣而不是靠判斷通過。"
              lesson="「看得到路」不等於「看得出安全」。低光下遇到疑似結冰的路段，應降速、確認踏點，必要時等天亮，或改用相應的裝備與通過方式。"
            />
          </ChapterSection>

          {/* Chapter 4 */}
          <ChapterSection id="ch4" number="第四章" title="不摸早黑的優勢">
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              這不是鼓勵晚出發，而是尋找「最佳出發時間」。
            </p>

            <GridContainer cols={3}>
              {[
                ['視線改善', '民用曙暮光後路跡判讀正確率明顯提升。'],
                ['精神狀態提升', '足夠睡眠帶來更好的風險判斷。'],
                ['導航更準確', '岔路辨識與地形對照更可靠。'],
                ['休息次數降低', '有效移動比例提高。'],
                ['移動效率提升', '同樣時數走更遠、更穩定。'],
                ['決策品質', '領隊有餘裕觀察隊伍，而非追趕時間。'],
              ].map(([t, desc]) => (
                <Card key={t} title={t}>
                  <p>{desc}</p>
                </Card>
              ))}
            </GridContainer>

            <SubHeading eyebrow="冬季考量">
              冬季不摸早黑，換到的是什麼？
            </SubHeading>

            <GridContainer cols={2}>
              <WinterCard title="較完整的睡眠與暖身">
                <p>
                  身體有較完整的睡眠與暖身時間，出發時手腳與反應較接近正常狀態。
                </p>
              </WinterCard>
              <WinterCard title="自然光線協助辨識">
                <p>
                  天亮後，自然光線有助於辨識冰雪與地形，不必只靠頭燈判斷。
                </p>
              </WinterCard>
              <WinterCard title="避開多重條件同時存在">
                <p>
                  避免在低溫、睡眠不足與黑暗同時存在的狀態下開始行進。
                </p>
              </WinterCard>
              <WinterCard title="有機會等待條件改善">
                <p>
                  氣溫、光線與部分地面狀態可能在等待中改善，領隊也有時間重新確認資訊。
                </p>
              </WinterCard>
            </GridContainer>

            <Card eyebrow="但不是絕對安全" title="晚出發，風險可能移到傍晚">
              <p>
                冬季白天本來就短，晚出發會壓縮可用的光線。若路線長度、午後天候或目的地條件不允許，不摸早黑反而可能把隊伍推向被動摸晚黑。
              </p>
              <p>
                所以要在午後天候、剩餘日照、路線長度與目的地條件的前提下判斷，而不是把「晚一點出發」當成安全的答案。
              </p>
            </Card>

            <QuoteBlock>最早出發，不一定最早抵達。</QuoteBlock>
          </ChapterSection>

          {/* Chapter 5 */}
          <ChapterSection id="ch5" number="第五章" title="摸早黑管理方式">
            <GridContainer cols={2}>
              <ChecklistCard
                storageKey="morning_departure"
                title="出發前確認"
                items={[
                  '睡眠時間是否足夠',
                  '頭燈（主燈）功能正常',
                  '備用電池',
                  '保暖裝備',
                  '路線熟悉程度',
                ]}
              />
              <div className="space-y-4">
                <Card eyebrow="行進中" title="前 1～2 小時不要追求速度">
                  <p>
                    低光時段以穩定、確認、隊伍完整為優先，速度留給天亮之後。
                  </p>
                </Card>
                <Card eyebrow="天亮後" title="重新評估四件事">
                  <ul className="space-y-1.5">
                    <li>· 隊伍實際速度</li>
                    <li>· 體力與精神狀態</li>
                    <li>· 行程進度落差</li>
                    <li>· 後續路段風險</li>
                  </ul>
                </Card>
              </div>
            </GridContainer>

            <SubHeading eyebrow="冬季檢核">
              冬季摸早黑出發前，要追加確認什麼？
            </SubHeading>

            <GridContainer cols={2}>
              <ChecklistCard
                storageKey="morning_departure_winter"
                title="冬季追加檢核"
                items={[
                  '已確認日出、日落與曙暮光時間，並估算冬季實際可用日照',
                  '已掌握當晚與清晨的溫度變化',
                  '已評估結冰、積雪或凍結地面的可能',
                  '照明足夠，且備有獨立的備用電源',
                  '頭燈低溫續航足以支應預估時間（含延誤）',
                  '隊員具備相應的冰雪地形經驗與裝備',
                  '手套兼顧保暖與操作能力',
                  '低溫下仍能正常操作扣具、拉鍊、手機與 GPS',
                  '水壺、吸管與飲水系統已評估結冰風險',
                  '食物不易因低溫變硬，仍方便進食',
                  '已預留穿脫衣物、調整裝備與休息的時間',
                ]}
              />
              <div className="space-y-4">
                <WinterCard eyebrow="人體限制" title="低溫直接拖慢動作">
                  <ul className="space-y-1.5">
                    <li>· 手指靈活度下降，手腳僵硬、動作變慢</li>
                    <li>· 穿脫衣物與調整裝備耗時增加</li>
                    <li>· 疲勞與寒冷可能互相加重，影響注意力與判斷</li>
                    <li>· 進食與飲水意願降低</li>
                    <li>· 隊員可能怕麻煩、怕拖累隊伍而不主動反映</li>
                  </ul>
                </WinterCard>
                <WinterCard eyebrow="裝備限制" title="不能照一般溫度的經驗判斷">
                  <ul className="space-y-1.5">
                    <li>· 電池低溫續航下降</li>
                    <li>· 水壺、吸管與水管可能結冰</li>
                    <li>· 食物變硬，不容易食用</li>
                    <li>· 扣具與拉鍊可能變得難以操作</li>
                    <li>· 手套影響手機、GPS、頭燈與導航設備的操作</li>
                  </ul>
                </WinterCard>
              </div>
            </GridContainer>

            <CaseStudy
              tag="案例分析 A"
              title="03:00 出發的縱走隊，反而在 19:40 才進山屋"
              situation="為避開午後雷雨，隊伍提前至 03:00 出發，多數隊員僅睡 3 小時。"
              mistake="前段低光路段速度未降，兩次錯過岔路回頭；天亮後疲勞累積，休息次數由每小時 1 次增為 3 次。"
              lesson="摸早黑的成本沒有被計算：睡眠負債與低光導航錯誤，最終轉換成被動摸晚黑。"
            />
          </ChapterSection>

          {/* Chapter 6 */}
          <ChapterSection id="ch6" number="第六章" title="摸晚黑管理">
            <GridContainer cols={2}>
              <Card eyebrow="成因" title="摸晚黑可能原因">
                <ul className="space-y-1.5">
                  <li>· 路線困難度高於預期</li>
                  <li>· 天候延誤</li>
                  <li>· 隊伍速度不足</li>
                  <li>· 突發事件（傷病、迷航、裝備故障）</li>
                </ul>
              </Card>
              <Card eyebrow="原則" title="摸晚黑前必須先做判斷">
                <p>
                  決定不是「要不要摸黑」，而是「在什麼條件下摸黑仍可控」。
                </p>
              </Card>
            </GridContainer>

            <GridContainer cols={3}>
              <Card eyebrow="評估面向" title="時間">
                <ul className="space-y-1.5">
                  <li>· 剩餘距離與爬升</li>
                  <li>· 預估抵達時間（含誤差）</li>
                </ul>
              </Card>
              <Card eyebrow="評估面向" title="隊伍">
                <ul className="space-y-1.5">
                  <li>· 最慢隊員狀態</li>
                  <li>· 整體疲勞程度</li>
                </ul>
              </Card>
              <Card eyebrow="評估面向" title="環境">
                <ul className="space-y-1.5">
                  <li>· 天氣與能見度</li>
                  <li>· 溫度與失溫風險</li>
                  <li>· 後續地形難度</li>
                </ul>
              </Card>
            </GridContainer>

            <SubHeading eyebrow="冬季摸晚黑">
              白天走過的路，傍晚不一定還是同一個狀態
            </SubHeading>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              冬季摸晚黑，是經過白天日照與整日行進之後，逐步進入低光與低溫環境。這段時間地面狀態可能持續改變。下面是一種可能出現的過程，不是固定的時間表：
            </p>

            <StepFlow
              steps={[
                '白天日照使部分積雪、冰面、岩石表面升溫或融化',
                '融雪使地面潮濕、含水',
                '日照消失，地表逐漸失去熱量',
                '部分潮濕地面可能再次結冰',
              ]}
              tone="danger"
            />

            <GridContainer cols={3}>
              <WinterCard title="變化速度不一">
                <p>
                  陰影處、背陽坡、稜線與不同材質（雪、冰、岩石、土壤）降溫與結冰的時間不一定相同，同一段路也可能前後不同。
                </p>
              </WinterCard>
              <WinterCard title="辨識能力一起下降">
                <p>
                  天色變暗後，原本在白天可以辨識的濕滑地面、冰面與地形，變得不容易判斷。
                </p>
              </WinterCard>
              <WinterCard title="疲勞與低溫疊加">
                <p>
                  整日行進後，體力與注意力已下降，日落後降溫又讓手部操作與判斷品質進一步變差。
                </p>
              </WinterCard>
            </GridContainer>

            <QuoteBlock>
              不要以白天通過時的地面狀態，推斷傍晚仍然相同。
            </QuoteBlock>

            <SubHeading eyebrow="早黑與晚黑對照">
              冬季摸早黑與摸晚黑，起始條件不同
            </SubHeading>

            <ComparisonTable
              headers={['比較面向', '冬季摸早黑', '冬季摸晚黑']}
              rows={[
                [
                  '進入黑暗前的狀態',
                  '經歷整夜低溫，天亮前開始行進；身體可能剛起床、尚未暖開、睡眠不足',
                  '經過白天日照與整日行進，逐步進入低光與低溫；體力已有消耗',
                ],
                [
                  '地面可能的狀態',
                  '夜間低溫可能使地面結冰，也可能有積雪、冰面與凍土',
                  '白天融雪或潮濕的地面，可能在降溫後再次結冰；各處變化不一',
                ],
                [
                  '光線變化方向',
                  '由暗轉亮，天亮後辨識改善，但冰雪不一定立即消失',
                  '由亮轉暗，原本可辨識的地形與濕滑面逐漸變得難以判斷',
                ],
                [
                  '人體主要限制',
                  '手腳僵硬，協調與判斷尚未完全恢復',
                  '疲勞累積，注意力下降，低溫使手部操作變差',
                ],
                [
                  '常見心理壓力',
                  '想趁早走、怕耽誤預定進度',
                  '接近目的地而急於抵達，不願停下或撤退',
                ],
                [
                  '管理重點',
                  '起登前確認溫度、地面、照明與暖身；前段降速',
                  '提早評估剩餘距離與下一段地形；不以白天狀態推斷傍晚',
                ],
              ]}
            />

            <Card eyebrow="避免過度簡化" title="實際地面狀態取決於什麼？">
              <p>
                上表是「可能」的差異，不是「早黑一定結冰、晚黑一定融雪」。實際狀態取決於：
              </p>
              <ul className="space-y-1.5">
                <li>· 空氣溫度與地表溫度</li>
                <li>· 日照時間與角度、陰影與背陽程度</li>
                <li>· 風勢、濕度與地面含水量</li>
                <li>· 雪、冰、岩石、土壤等不同材質</li>
                <li>· 地形位置與海拔</li>
              </ul>
              <p>一切以現場觀察與實際環境為準。</p>
            </Card>

            <CaseStudy
              tag="冬季案例 E"
              title="白天融雪的濕滑路段，傍晚變成冰面"
              situation="午後陽光使路面積雪部分融化，隊伍通過時只覺得潮濕泥濘，沒有特別處理。傍晚隊伍再次經過陰影較多的同一區段，天色漸暗，氣溫也下降了。"
              mistake="以白天通過時的狀態推斷現在，沒有預期潮濕地面可能再次結冰。加上隊員已疲勞，在低光下才發現部分路段變滑，只好臨時放慢並重新處理。"
              lesson="同一段路在一天之內可能是不同的地形。要把「之後再經過時的狀態」一併評估，並趁日照還在時先決定通過方式。"
            />
          </ChapterSection>

          {/* Chapter 7 */}
          <ChapterSection id="ch7" number="第七章" title="摸晚黑行進管理">
            <GridContainer cols={3}>
              {[
                ['降低速度', '以可確認的節奏行進，不以趕路彌補延誤。'],
                ['增加隊伍控制', '明確前導與押隊，人數點名制度化。'],
                ['縮短隊距', '維持燈光可及範圍，避免脫節。'],
                ['增加確認', '每個岔路、每段轉折都停下確認。'],
                ['避免危險地形', '崩壁、碎石坡、渡溪等，寧可等待或改道。'],
                ['裝備確認', '頭燈、備用電池、保暖層、雨具立即可取。'],
              ].map(([t, desc]) => (
                <Card key={t} title={t}>
                  <p>{desc}</p>
                </Card>
              ))}
            </GridContainer>

            <SubHeading eyebrow="冬季行進">
              低光、冰雪與疲勞同時存在時，怎麼走？
            </SubHeading>

            <GridContainer cols={3}>
              <WinterCard title="辨識冰雪、濕岩與凍土">
                <p>
                  低光下，冰面、濕滑岩石與凍土不易分辨。對疑似結冰或濕滑的地面，先當作有風險處理，放慢並確認踏點。
                </p>
              </WinterCard>
              <WinterCard title="步伐與重心">
                <p>
                  縮小步幅、放低重心，踏穩再移動；避免在不確定的踏面上急停或大跨步。
                </p>
              </WinterCard>
              <WinterCard title="隊距與前後照應">
                <p>
                  隊距維持在燈光與聲音可及的範圍。在冰雪或濕滑路段，前導與押隊要確認後方狀況，再決定節奏。
                </p>
              </WinterCard>
              <WinterCard title="疲勞影響平衡與反應">
                <p>
                  疲勞會降低平衡、判斷與反應速度，而冰雪與濕滑地面的容錯空間本來就小。
                </p>
              </WinterCard>
              <WinterCard title="低溫下的手部操作">
                <p>
                  手指變遲鈍時，調整扣具、拉鍊、頭燈與導航都會變慢。要趁還有餘裕時先處理，而不是等到非做不可才做。
                </p>
              </WinterCard>
              <WinterCard title="最慢隊員的真實狀態">
                <p>
                  以最慢隊員作為隊伍速度與體力的基準，留意發抖、話變少、動作遲緩等跡象。
                </p>
              </WinterCard>
            </GridContainer>

            <SubHeading eyebrow="時間壓力與心理">
              最後一段路，最容易放鬆警覺
            </SubHeading>

            <GridContainer cols={2}>
              <Card eyebrow="心理因素" title="不因接近山屋或登山口而加快">
                <p>
                  目的地在望，心理上容易急著抵達；但最後一段的地形風險，不會因為距離近而降低。
                </p>
              </Card>
              <Card eyebrow="心理因素" title="不因剩餘距離短而忽略地形">
                <p>
                  判斷單位仍然是「下一段地形」，而不是「剩餘總時間」。冬季最後一段若是背陽、下坡或結冰路段，更要停下來確認。
                </p>
              </Card>
              <Card eyebrow="心理因素" title="怕拖累隊伍，所以不說">
                <p>
                  隊員可能不敢說自己很冷、很累或不舒服。領隊可以用具體的問題確認，例如手指還能不能順利操作拉鍊、腳步穩不穩，比問「還好嗎？」更容易得到真實回答。
                </p>
              </Card>
              <Card eyebrow="心理因素" title="群體壓力">
                <p>
                  全隊都想快點到的時候，最慢隊員的狀態最容易被忽略，被當成「應該還可以」。
                </p>
              </Card>
            </GridContainer>

            <CaseStudy
              tag="案例分析 B"
              title="距離山屋 40 分鐘，但下一段是碎石橫渡"
              situation="日落後 30 分鐘，隊伍抵達碎石坡入口，最慢隊員已明顯落後。"
              mistake="若以『只剩 40 分鐘』為由續行，等於在最低光線、最疲勞的狀態通過最高風險地形。"
              lesson="判斷單位是『下一段地形』，不是『剩餘總時間』。原地紮營或退回安全點才是可控選項。"
            />
          </ChapterSection>

          {/* Chapter 8 */}
          <ChapterSection
            id="ch8"
            number="第八章"
            title="頭燈與照明風險管理"
          >
            <QuoteBlock>摸黑時間越長，照明風險越高。</QuoteBlock>

            <GridContainer cols={2}>
              <Card eyebrow="電力因素" title="不是有燈就等於有照明">
                <ul className="space-y-1.5">
                  <li>· 頭燈實際續航（高亮模式衰減快）</li>
                  <li>· 使用亮度與照射距離需求</li>
                  <li>· 備用電池數量與可取用性</li>
                  <li>· 低溫造成電量急速下降</li>
                </ul>
              </Card>
              <Card eyebrow="規劃因素" title="不能只問「有沒有頭燈？」">
                <ul className="space-y-1.5">
                  <li>· 預計使用時間（小時）</li>
                  <li>· 延誤情境下的最大使用時間</li>
                  <li>· 夜間地形所需照明能力</li>
                </ul>
              </Card>
            </GridContainer>

            <ComparisonTable
              headers={['地形', '主要照明需求', '風險重點']}
              rows={[
                ['寬稜', '中等亮度、廣角', '方向偏移、路跡分歧'],
                ['森林', '廣角近距照明', '路標不易發現、視野受限'],
                ['箭竹', '近距高亮', '路跡被覆蓋、隊員脫節'],
                ['碎石坡', '遠近兼具、聚光', '落石、踏點判斷'],
                ['崩壁', '高亮聚光＋備援燈', '路線判讀錯誤代價極高'],
                [
                  '冰雪坡面／結冰路段',
                  '足夠亮度，且能近距離觀察路面',
                  '冰面不易靠照明辨識、雪地反光影響判讀，踏點與通過方式需另行確認',
                ],
              ]}
            />

            <SubHeading eyebrow="低溫與雪地">
              看得到路，不等於看得出路面是否安全
            </SubHeading>

            <GridContainer cols={3}>
              <WinterCard title="低溫與電池">
                <p>
                  低溫可能降低電池可用容量與續航表現。手機、GPS 等電子設備也要考慮低溫影響，備用電池可放在較貼近身體、不易受凍的位置。
                </p>
              </WinterCard>
              <WinterCard title="標示續航不能直接採用">
                <p>
                  不能只依賴標示的續航時間。備用電池或備用電源要有明確的數量與取用方式。
                </p>
              </WinterCard>
              <WinterCard title="亮度、角度與雪地反光">
                <p>
                  亮度與照射角度會影響對地面細節的辨識；雪地反光可能造成眩光，或讓地面起伏看起來變平。
                </p>
              </WinterCard>
              <WinterCard title="看得到路 ≠ 看得出安全">
                <p>
                  必須區分「看得到路」與「看得出路面是否安全」。冰面不一定能透過頭燈照明清楚辨識，疑似結冰的路段要降速確認。
                </p>
              </WinterCard>
              <WinterCard title="戴手套操作頭燈">
                <p>
                  戴著手套開關頭燈、切換模式、更換電池都可能很困難。要事先練習，並決定更換電池的時機與地點，避免在寒風中脫手套處理。
                </p>
              </WinterCard>
              <WinterCard title="備用照明要能獨立使用">
                <p>
                  備用照明應能獨立使用，不能把手機手電筒當作唯一備援；手機電量還要留給通訊與導航。
                </p>
              </WinterCard>
            </GridContainer>

            <CaseStudy
              tag="冬季案例 F"
              title="手指僵硬，連扣具與導航都處理不了"
              situation="凌晨低溫中，隊員戴著厚手套，想換電池、調整背包扣具，拉鍊與手機螢幕也無法順利操作，只好脫手套處理，手指更快變冷。"
              mistake="出發前沒有確認手套能否兼顧保暖與操作，也沒有預留操作時間。一個人處理裝備，全隊在原地停留變冷，延遲持續累積。"
              lesson="低溫下的操作成本要事先算進行程。手套搭配、裝備放置位置與換電池方式，應在出發前演練，並把裝備調整安排在適合的地點與時機。"
            />
          </ChapterSection>

          {/* Chapter 9 */}
          <ChapterSection id="ch9" number="第九章" title="主動摸黑與被動摸黑">
            <ComparisonTable
              headers={['項目', '主動摸黑', '被動摸黑']}
              rows={[
                ['性質', '事前規劃', '非預期發生'],
                ['典型情境', '凌晨出發、預定夜行段', '延誤累積、突發事件'],
                ['裝備狀態', '已針對夜行配置', '臨時取用、可能不足'],
                ['隊伍狀態', '體力充足、精神佳', '疲勞、判斷力下降'],
                ['目的', '降低其他風險（雷雨、時數）', '應避免'],
                ['管理方式', '可規劃、可演練', '需即時決策與止損'],
              ]}
            />

            <QuoteBlock>
              主動摸黑可以管理，被動摸黑需要避免。
            </QuoteBlock>

            <SubHeading eyebrow="冬季比較">
              冬季環境下，主動與被動摸黑的差別
            </SubHeading>

            <GridContainer cols={2}>
              <WinterCard eyebrow="冬季主動摸黑" title="出發前就已回答這些問題">
                <ul className="space-y-1.5">
                  <li>· 事前知道會在黑暗中行進，且清楚是摸早黑還是摸晚黑</li>
                  <li>· 已評估光線、溫度、地面狀態與裝備</li>
                  <li>· 已確認隊伍的冰雪地形能力與替代方案</li>
                  <li>· 已訂出清楚的時間節點與撤退條件</li>
                </ul>
              </WinterCard>
              <WinterCard eyebrow="冬季被動摸黑" title="常見的失控來源">
                <ul className="space-y-1.5">
                  <li>· 行程延誤，超過原本預估時間</li>
                  <li>· 冰雪地形使速度下降</li>
                  <li>· 低溫、疲勞與裝備操作困難造成時間增加</li>
                  <li>· 沒有預料到融雪後再次結冰</li>
                  <li>· 因為接近目的地而不願意撤退</li>
                  <li>· 原本沒打算在黑暗中通過的地形，最後被迫摸黑通過</li>
                </ul>
              </WinterCard>
            </GridContainer>

            <QuoteBlock>
              主動摸黑不代表風險消失；被動摸黑也不只是天黑才發現，而是前面的時間與風險管理已經失去控制。
            </QuoteBlock>

            <Card
              eyebrow="早黑與晚黑要分開管理"
              title="同樣是主動摸黑，重點並不一樣"
            >
              <p>
                冬季主動摸早黑，重點在起登前的溫度、地面、暖身與照明；冬季主動摸晚黑，重點在白天地面狀態的變化與整日累積的疲勞。兩者的差異可參考第六章的對照表，不能用「天黑了」一句話帶過。
              </p>
            </Card>
          </ChapterSection>

          {/* Chapter 10 */}
          <ChapterSection id="ch10" number="第十章" title="領隊時間決策模型">
            <Card eyebrow="思維轉換" title="領隊不是問：「會不會摸黑？」">
              <p>
                而是依序回答下列五個問題。任何一題為「否」，就必須調整計畫。
              </p>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {[
                '現在光線是否適合通過下一段地形？',
                '隊伍速度是否符合預期？',
                '延誤原因是否可改善？',
                '繼續前進是否比停留安全？',
                '是否仍有撤退選項？',
              ].map((q, idx) => (
                <div key={q} className="surface-card p-5 print-plain">
                  <span className="font-mono text-2xl font-bold text-primary">
                    0{idx + 1}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {q}
                  </p>
                </div>
              ))}
            </div>

            <StepFlow
              steps={[
                '評估下一段地形所需光線',
                '比對隊伍實際速度與預估抵達時間',
                '判斷延誤原因是否可改善',
                '比較「前進 / 停留 / 撤退」風險',
                '做出決策並向隊伍明確宣告',
              ]}
              tone="safe"
            />

            <SubHeading eyebrow="冬季判斷">
              冬季環境下，五個問題要再追加哪些判斷？
            </SubHeading>

            <GridContainer cols={2}>
              <WinterCard eyebrow="地面與地形" title="接下來的路面是什麼狀態？">
                <ul className="space-y-1.5">
                  <li>· 地面是否已經結冰，或可能再次結冰？</li>
                  <li>· 接下來的地形是否需要冰雪通行能力？</li>
                </ul>
              </WinterCard>
              <WinterCard eyebrow="人" title="隊伍還能正常操作嗎？">
                <ul className="space-y-1.5">
                  <li>· 最慢隊員是否已出現失溫、疲勞或操作困難？</li>
                  <li>· 手部是否仍能正常操作裝備？</li>
                </ul>
              </WinterCard>
              <WinterCard eyebrow="裝備" title="照明、導航與補給夠用嗎？">
                <ul className="space-y-1.5">
                  <li>· 頭燈、電池與導航設備是否足夠？</li>
                  <li>· 飲水與食物是否能正常使用？</li>
                </ul>
              </WinterCard>
              <WinterCard eyebrow="決策壓力" title="是環境逼人，還是人在逼自己？">
                <ul className="space-y-1.5">
                  <li>· 隊伍是否因為時間壓力而急於趕路？</li>
                  <li>· 是否有人因為怕拖累隊伍而隱瞞身體狀況？</li>
                  <li>· 領隊是否因為不想取消、撤退或讓隊員失望而勉強繼續？</li>
                </ul>
              </WinterCard>
            </GridContainer>

            <SubHeading eyebrow="心理因素">
              時間壓力不只來自環境，也來自人
            </SubHeading>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              隊伍延誤，不一定只是體力不足。下面這些心理因素，常常讓原本合理的判斷在途中走樣：
            </p>

            <GridContainer cols={3}>
              <Card eyebrow="心理因素" title="目的地偏誤">
                <p>
                  因為已經走了很遠、離目的地很近，就低估眼前地形的風險。對策：用「下一段地形」而不是「剩餘距離」來判斷。
                </p>
              </Card>
              <Card eyebrow="心理因素" title="沉沒成本">
                <p>
                  覺得付出這麼多，現在撤退很可惜。對策：問自己「如果現在才出發，我還會走這一段嗎？」
                </p>
              </Card>
              <Card eyebrow="心理因素" title="群體壓力">
                <p>
                  不敢說自己冷、累或不舒服，怕拖累隊伍。對策：事前講明說出狀況是在幫助隊伍，並由領隊主動詢問、定時確認。
                </p>
              </Card>
              <Card eyebrow="心理因素" title="時間焦慮">
                <p>
                  天色即將變暗，急著趕路，速度與步伐失控。對策：先停下來重新估算，再決定怎麼走，而不是邊走邊追。
                </p>
              </Card>
              <Card eyebrow="心理因素" title="領隊心理">
                <p>
                  不願承認原先的時間規劃有誤，不想取消、撤退或讓隊員失望。對策：預先宣告撤退條件，讓決策依據條件，而不是情緒。
                </p>
              </Card>
              <Card eyebrow="心理因素" title="忽略最慢隊員">
                <p>
                  隊伍氣氛都想往前時，最慢隊員的狀態最容易被當成「應該還可以」。對策：以最慢隊員作為速度與體力的基準。
                </p>
              </Card>
            </GridContainer>

            <QuoteBlock>
              領隊應該依照當下隊伍與環境重新判斷，而不是被原定行程綁架。
            </QuoteBlock>

            <GridContainer cols={2}>
              <ChecklistCard
                storageKey="leader_decision"
                title="決策前現地確認"
                items={[
                  '已確認最慢隊員狀態',
                  '已確認剩餘距離與爬升',
                  '已確認頭燈電力可支撐預估時間 ×2',
                  '已確認下一段地形難度',
                  '已確認撤退點與可紮營點',
                  '已向全隊宣告決策與時間節點',
                ]}
              />
              <ChecklistCard
                storageKey="leader_decision_winter"
                title="冬季追加確認"
                items={[
                  '已確認日出、日落、曙暮光時間與冬季實際可用日照',
                  '已確認地面冰雪、融雪與可能再結冰的狀態',
                  '已確認下一段地形所需的冰雪通行能力，且隊員具備',
                  '已確認最慢隊員的身體與心理狀態（含是否有人隱瞞不適）',
                  '已確認手部仍能正常操作裝備、手機與導航',
                  '已確認頭燈、備用電源與導航設備電力，並考慮低溫影響',
                  '已確認飲水與食物仍能正常使用',
                  '已確認隊伍沒有因時間壓力而做出不合理決策',
                  '已確認撤退、等待與替代路線',
                  '已確認領隊不是因不想取消或讓人失望而勉強繼續',
                ]}
              />
            </GridContainer>

            <CaseStudy
              tag="冬季案例 G"
              title="距離山屋只剩一小段，隊伍選擇繼續"
              situation="傍晚氣溫下降，隊伍離山屋已不遠。數名隊員明顯疲勞，其中一人手指僵硬、話變少卻沒有主動說明。最後一段是背陽的下坡，地面有積雪與部分結冰的跡象。"
              mistake="領隊與隊員都因為「快到了、已經走這麼遠」而不願停下，沒有重新評估最後一段地形與最慢隊員的狀態。結果在低光、疲勞與結冰同時存在時，通過了最需要穩定的路段。"
              lesson="目的地近不等於風險低。接近終點時更需要停下來，重新用五個問題判斷，必要時調整通過方式、等待，或退回安全點。"
            />
          </ChapterSection>

          {/* Chapter 11 */}
          <ChapterSection id="ch11" number="第十一章" title="核心總結">
            <div className="grid gap-4 md:grid-cols-2">
              <QuoteBlock large>
                摸早黑不是勇敢的象徵，而是一種時間策略。
              </QuoteBlock>
              <QuoteBlock large>
                摸晚黑不是失敗，失控摸晚黑才是問題。
              </QuoteBlock>
              <QuoteBlock large>
                安全不是越早出發，而是在隊伍最佳狀態下完成行程。
              </QuoteBlock>
              <QuoteBlock large>
                領隊管理的不是黑暗，而是光線條件下的風險。
              </QuoteBlock>
            </div>

            <QuoteBlock large>
              冬季摸早黑不只是摸黑，而是可能在冰天雪地之中摸黑行進。
            </QuoteBlock>

            <Card eyebrow="一般季節與冬季的共同核心" title="整份教材的重點">
              <ul className="space-y-1.5">
                <li>· 管理的不是日出日落時間，而是隊伍能否安全通過接下來的地形</li>
                <li>· 黑暗不只是視線問題</li>
                <li>· 冬季黑暗可能同時伴隨冰雪、低溫、身體僵硬與裝備操作困難</li>
                <li>· 早黑與晚黑的環境起始條件不同，不能用同一種方式管理</li>
                <li>· 天亮不代表冰雪消失，日落也不代表地面立即結冰</li>
                <li>· 時間預估必須納入環境、隊伍實際速度與操作成本</li>
                <li>· 領隊必須保留撤退、等待與調整行程的選擇</li>
              </ul>
            </Card>

            <Card
              eyebrow="模組定位"
              title="本教案屬於亞馬遜國家山岳協會登山教育平台"
            >
              <p>未來可延伸的模組：</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  '隊伍分流管理',
                  '配速管理',
                  '等待管理',
                  '天候延誤管理',
                  '撤退決策',
                  'GPX 時間風險分析',
                  '登山決策模型',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </ChapterSection>
        </article>
      </main>

      {/* Official Association Footer */}
      <footer className="border-t border-border/60 bg-card/40 print-plain">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border/40">
            {/* Brand block linking back to amazon-hike.com */}
            <div>
              <a
                href="https://amazon-hike.com/"
                className="inline-flex items-center gap-2 group text-left"
              >
                <div className="w-7 h-7 rounded bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    亞馬遜國家山岳協會
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Amazon Alpine Association
                  </p>
                </div>
              </a>
            </div>

            {/* Navigation links within amazon-hike.com */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://amazon-hike.com/"
                className="hover:text-foreground transition-colors"
              >
                協會首頁
              </a>
              <a
                href="https://amazon-hike.com/intro"
                className="hover:text-foreground transition-colors"
              >
                登山入門指南
              </a>
              <span className="text-foreground font-medium">
                Chapter 25：時間與光線管理
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-muted-foreground">
            <p className="max-w-2xl leading-relaxed">
              登山教育平台 · 登山入門指南 Chapter 25 · 時間與光線風險管理模組。
              本教材供領隊教育訓練使用，實際行程決策仍須依現地天候與地形條件判斷。
            </p>
            <p className="font-mono whitespace-nowrap">
              © 亞馬遜國家山岳協會 Amazon Alpine Association
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
