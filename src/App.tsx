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
          src="/images/hero-twilight-ridge.jpg"
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
            從曙暮光、摸早黑到摸晚黑的行程決策
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
              ]}
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
