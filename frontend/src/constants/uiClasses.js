export const ui = {
  text: {
    eyebrow: "text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]",
    eyebrowWide: "text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]",
    muted: "text-[var(--text-muted)]",
    mutedSm: "text-sm text-[var(--text-muted)]",
    mutedXs: "text-xs text-[var(--text-muted)]",
    titleXl: "text-3xl font-semibold",
    titleLg: "text-2xl font-semibold",
    titleMd: "text-xl font-semibold",
    titleSm: "text-lg font-semibold",
    label: "text-sm font-medium",
    labelStrong: "text-sm font-semibold",
    labelXs: "text-xs font-medium",
    value: "text-sm font-medium text-[var(--text)]",
    bodySm: "text-sm text-[var(--text)]",
    mutedXsMt1: "mt-1 text-xs text-[var(--text-muted)]",
  },
  layout: {
    page: "space-y-6",
    pageLg: "space-y-8",
    stack: "space-y-6",
    headerRow: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
    actionsRow: "flex flex-wrap gap-3",
    rowBetween: "flex items-center justify-between",
    rowBetweenWrap: "flex flex-wrap items-center justify-between gap-3",
    rowGap2: "flex items-center gap-2",
    rowGap3: "flex items-center gap-3",
    rowWrapGap3: "flex flex-wrap items-center gap-3",
    rowGap4: "flex items-center gap-4",
    colGap4: "flex flex-col gap-4",
    colGap6: "flex flex-col gap-6",
    colGap8: "flex flex-col gap-8",
    gridTwoCol: "grid gap-4 md:grid-cols-2",
    flex1: "flex-1",
  },
  icon: {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    dotSm: "h-2 w-2 rounded-full",
    dotMd: "h-2.5 w-2.5 rounded-full",
    mutedMd: "h-6 w-6 text-[var(--text-muted)]",
  },
  button: {
    primary: "rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95",
    primaryWide: "rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-95",
    primaryFull:
      "w-full rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70",
    secondary:
      "rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]",
    secondaryOutline:
      "rounded-2xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]",
    secondarySm:
      "rounded-2xl border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]",
    secondaryXs:
      "rounded-2xl border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]",
    dangerSm:
      "rounded-2xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-500 transition hover:border-rose-300",
    dangerXs:
      "rounded-2xl border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-500 transition hover:border-rose-300",
    link: "text-sm font-medium text-[var(--accent)]",
    linkXs: "text-xs text-[var(--accent)]",
  },
  input: {
    base:
      "w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]",
    baseText:
      "w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]",
    compact:
      "rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5 text-sm font-medium outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]",
  },
  select: {
    base:
      "w-full appearance-none rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]",
  },
  textarea: {
    base:
      "w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]",
  },
  form: {
    floatingField:
      "peer w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 pb-3 pt-5 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]",
    floatingFieldSelect:
      "peer appearance-none w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 pb-3 pt-5 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]",
    floatingLabel:
      "pointer-events-none absolute left-4 top-4 text-xs font-medium text-[var(--text-muted)] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs",
    stickyBar:
      "sticky bottom-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)]",
  },
  checkbox: "h-4 w-4 rounded border-[var(--border)]",
  card: {
    lg: "rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]",
    md: "rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]",
    sm: "rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]",
    shell:
      "rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]",
    panel:
      "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]",
    panelSm:
      "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]",
    panelMuted:
      "rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4",
    panelMutedSm:
      "rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-3",
    panelInset:
      "rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2",
    panelInsetLg:
      "rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3",
    kpi:
      "group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition hover:-translate-y-0.5 hover:shadow-lg",
    skeleton:
      "animate-shimmer rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5",
    empty:
      "rounded-2xl border border-dashed border-[var(--border)] p-6 text-center text-sm text-[var(--text-muted)]",
  },
  table: {
    base: "w-full text-left text-sm",
    header:
      "bg-[var(--surface-2)] text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]",
    headCell: "px-5 py-3",
    cell: "px-5 py-4",
    row: "border-t border-[var(--border)] transition hover:bg-[var(--surface-2)]",
  },
  badge: {
    base:
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
  },
  statsCard: {
    header: "flex items-center justify-between",
    iconWrap:
      "flex h-10 w-10 items-center justify-center rounded-2xl ring-1 ring-inset",
    change: "text-xs font-semibold",
    title: "mt-4 text-sm text-[var(--text-muted)]",
    value: "mt-2 text-2xl font-semibold text-[var(--text)]",
    trend: "mt-2 text-xs text-[var(--text-muted)]",
  },
  nav: {
    linkBase:
      "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition",
    linkActive: "bg-[var(--accent-soft)] text-[var(--accent)]",
    linkInactive:
      "text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]",
    icon: "text-[var(--accent)]/80",
  },
  appLayout: {
    root: "relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]",
    overlay: "pointer-events-none absolute inset-0 opacity-60",
    shell: "relative flex min-h-screen",
    main: "flex min-h-screen min-w-0 flex-1 flex-col transition-[margin] duration-300",
    mainExpanded: "lg:ml-64",
    mainCollapsed: "lg:ml-20",
    mainArea: "px-6 pb-16 pt-28 lg:px-10",
    content: "mx-auto flex w-full max-w-6xl flex-col gap-8",
  },
  navbar: {
    header:
      "fixed top-0 right-0 z-20 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl transition-[left] duration-300",
    headerExpanded: "left-0 lg:left-64",
    headerCollapsed: "left-0 lg:left-20",
    container:
      "flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-10",
    searchWrap: "relative hidden min-w-[260px] flex-1 md:block",
    searchHint:
      "pointer-events-none absolute right-3 top-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]",
    mobileNav: "flex items-center gap-2 lg:hidden",
    profile: "flex items-center gap-3",
    profileCard:
      "flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2",
    profileAvatar:
      "h-9 w-9 rounded-full bg-gradient-to-br from-slate-900 to-slate-700",
    profileText: "hidden sm:block",
    themeWrap:
      "shrink-0 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5",
    themeIcon: "shrink-0 text-[var(--text-muted)]",
    themeSwitch:
      "relative shrink-0 h-7 w-12 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-2)] transition-colors",
    themeKnob:
      "absolute top-0.5 h-5 w-5 rounded-full border border-[var(--border)] bg-slate-900 shadow-sm transition-all duration-200 ease-in-out",
    themeKnobDark: "left-[1.625rem]",
    themeKnobLight: "left-0.5",
  },
  sidebar: {
    aside:
      "hidden flex-col border-r border-[var(--border)] bg-[var(--surface)]/85 backdrop-blur-xl transition-[width] duration-300 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:h-screen",
    asideExpanded: "w-64",
    asideCollapsed: "w-20",
    brandRow: "flex items-center gap-3 px-6 py-6",
    brandIcon:
      "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-400 text-sm font-semibold text-white",
    nav: "flex-1 space-y-1 px-4",
    progressTrack: "mt-4 h-2 rounded-full bg-[var(--bg-muted)]",
    progressFill:
      "h-2 w-[82%] rounded-full bg-gradient-to-r from-blue-500 to-teal-400",
    profileRow:
      "mt-6 flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3",
    profileAvatar:
      "shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-xs font-semibold text-white",
    footer: "mt-auto px-6 pb-6",
    logoutButtonWrap: "mt-3 w-full",
    collapsedCenter: "flex justify-center",
    iconButton: "flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]",
  },
  login: {
    page: "min-h-screen bg-[var(--bg)] text-[var(--text)]",
    grid: "grid min-h-screen lg:grid-cols-2",
    leftPanel:
      "relative hidden flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-12 py-12 text-white lg:flex",
    leftGlowBlue:
      "absolute -left-24 top-12 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl",
    leftGlowTeal:
      "absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-teal-400/30 blur-3xl",
    leftGlowRose:
      "absolute left-1/2 top-1/4 h-48 w-48 -translate-x-1/2 rounded-full bg-rose-400/20 blur-3xl",
    leftShapeOrbit:
      "absolute left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/10 bg-transparent blur-[1px]",
    leftShapeCard:
      "absolute right-16 top-1/3 h-24 w-40 rotate-12 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/10 backdrop-blur-md",
    leftShapeTop:
      "absolute left-10 top-16 h-28 w-28 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm",
    leftShapeBottom:
      "absolute bottom-16 right-12 h-20 w-20 rounded-full border border-teal-300/20 bg-teal-400/10 backdrop-blur-sm",
    brandWrap: "relative z-10",
    brandRow: "flex flex-col items-center gap-6 text-center",
    brandIcon:
      "flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-lg font-semibold",
    formWrap: "flex items-center justify-center px-6 py-12",
    form: "w-full max-w-md animate-fade-up",
    metaRow: "mt-5 flex items-center justify-between text-sm",
    titleStack: "space-y-2",
    fields: "mt-8 space-y-4",
    fieldGroup: "space-y-2",
    submitButton:
      "mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70",
  },
  dashboard: {
    page: "space-y-8",
    headerDescription: "mt-2 text-sm text-[var(--text-muted)]",
    sectionDescription: "mt-2 text-sm text-[var(--text-muted)]",
    kpiGrid: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
    kpiSkeletonIcon: "h-10 w-10 rounded-2xl bg-[var(--bg-muted)]",
    kpiSkeletonLineSm: "mt-6 h-4 w-1/2 rounded-full bg-[var(--bg-muted)]",
    kpiSkeletonLineLg: "mt-3 h-6 w-3/4 rounded-full bg-[var(--bg-muted)]",
    mainGrid: "grid gap-6 lg:grid-cols-3 lg:items-start",
    sideCol: "space-y-4",
    pipelineCard:
      "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] lg:col-span-2",
    mainLeftCol: "space-y-4 lg:col-span-2",
    panelHeader: "flex items-start justify-between",
    pipelineList: "mt-6 space-y-4",
    pipelineItem: "space-y-2",
    pipelineRow: "flex items-center justify-between text-sm",
    pipelineTrack: "h-2 rounded-full bg-[var(--bg-muted)]",
    pipelineFill: "h-2 rounded-full",
    analyticsBar:
      "h-32 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4",
    analyticsBarInner: "flex h-full overflow-hidden rounded-xl",
    analyticsBarSegment: "opacity-80",
    analyticsLegend: "space-y-3",
    analyticsLegendRow: "flex items-center justify-between text-sm",
    analyticsLegendLabel: "flex items-center gap-2",
    forecastCard:
      "mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4",
    forecastChart:
      "mt-4 h-20 rounded-2xl bg-gradient-to-r from-blue-500/20 via-teal-400/20 to-transparent",
    activityGrid: "mt-8 grid gap-4 md:grid-cols-2",
    activityCard:
      "rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4",
    activityList: "mt-4 space-y-4",
    activityItem: "flex gap-3",
    activityDot: "mt-1 h-2 w-2 rounded-full bg-[var(--accent)]",
    activityMeta: "mt-1 text-xs text-[var(--text-muted)]",
  },
  leads: {
    headerDescription: "mt-2 text-sm text-[var(--text-muted)]",
    formCard: "rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]",
    formHeader: "mb-6 flex items-center justify-between",
    filterCard: "rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]",
    filterGrid: "grid gap-4 lg:grid-cols-[1.2fr_repeat(3,_0.7fr)_0.6fr]",
    filterSummary:
      "mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--text-muted)]",
    tableShell: "rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]",
    tableHeader:
      "flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-4",
    tableActions: "flex flex-wrap gap-2",
    loadingList: "space-y-3 p-6",
    skeletonRow:
      "animate-shimmer h-14 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]",
    emptyState: "flex flex-col items-center gap-3 px-6 py-16 text-center",
    emptyIconWrap:
      "flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-2)]",
    tableWrap: "overflow-x-auto",
    leadCellInner: "flex items-center gap-3",
    leadAvatar:
      "flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-2)] text-xs font-semibold text-[var(--text)]",
    valueCell: "px-5 py-4 font-semibold",
    footer:
      "flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] px-5 py-4 text-sm text-[var(--text-muted)]",
    footerButtons: "flex items-center gap-2",
    priorityBadge: "rounded-full px-3 py-1 text-xs font-semibold",
  },
  leadDetails: {
    headerCard:
      "flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] lg:flex-row lg:items-center lg:justify-between",
    headerRow: "flex items-center gap-4",
    headerMeta: "mt-2 flex flex-wrap items-center gap-3",
    avatar:
      "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 text-lg font-semibold text-white",
    grid: "grid gap-6 lg:grid-cols-[minmax(0,_1fr)_320px]",
    infoGrid:
      "mt-4 grid gap-4 text-sm text-[var(--text-muted)] md:grid-cols-2",
    infoValue: "mt-1 text-sm font-medium text-[var(--text)]",
    activityList: "mt-5 space-y-4",
    activityItem: "flex gap-4",
    activityDot: "mt-1 h-2 w-2 rounded-full bg-[var(--accent)]",
    notesMeta: "mt-4",
    notesList: "mt-6 space-y-4",
    noteButton:
      "mt-4 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95",
    noteMeta: "mt-2 text-xs text-[var(--text-muted)]",
    dealValue: "mt-3 text-3xl font-semibold text-[var(--text)]",
    dealSubtext: "mt-2 text-sm text-[var(--text-muted)]",
    progressTrack: "mt-4 h-2 rounded-full bg-[var(--bg-muted)]",
    progressFill:
      "h-2 w-[68%] rounded-full bg-gradient-to-r from-blue-500 to-teal-400",
    snapshotList: "mt-4 space-y-3 text-sm",
    snapshotRow: "flex items-center justify-between",
    communicationList: "mt-4 space-y-4",
    activityMeta: "mt-1 text-xs text-[var(--text-muted)]",
    skeletonTitle:
      "animate-shimmer h-8 w-1/3 rounded-2xl bg-[var(--surface-2)]",
    skeletonLine:
      "animate-shimmer h-5 w-1/2 rounded-2xl bg-[var(--surface-2)]",
    skeletonLineLg:
      "animate-shimmer h-5 w-2/3 rounded-2xl bg-[var(--surface-2)]",
  },
  editLead: {
    page: "space-y-6",
    skeletonStack: "mt-6 space-y-3",
    card: "rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]",
    headerDescription: "mt-2 text-sm text-[var(--text-muted)]",
    skeletonTitle:
      "animate-shimmer h-6 w-1/3 rounded-2xl bg-[var(--surface-2)]",
    skeletonLine:
      "animate-shimmer h-4 w-2/3 rounded-2xl bg-[var(--surface-2)]",
    skeletonLineSm:
      "animate-shimmer h-4 w-1/2 rounded-2xl bg-[var(--surface-2)]",
  },
  leadForm: {
    form: "space-y-6",
    sectionGrid: "grid gap-4 md:grid-cols-2",
    fieldWrap: "relative",
    actionsRow: "flex flex-wrap items-center justify-between gap-3",
  },
  tone: {
    changePositive: "text-emerald-500",
    changeNegative: "text-rose-500",
    kpi: {
      blue: "text-blue-600 bg-blue-50/70 ring-blue-100",
      teal: "text-teal-600 bg-teal-50/70 ring-teal-100",
      amber: "text-amber-600 bg-amber-50/70 ring-amber-100",
      emerald: "text-emerald-600 bg-emerald-50/70 ring-emerald-100",
      slate: "text-slate-600 bg-slate-100 ring-slate-200",
    },
    status: {
      New: "bg-blue-50 text-blue-700 ring-blue-200",
      Contacted: "bg-indigo-50 text-indigo-700 ring-indigo-200",
      Qualified: "bg-teal-50 text-teal-700 ring-teal-200",
      "Proposal Sent": "bg-amber-50 text-amber-700 ring-amber-200",
      Won: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      Lost: "bg-rose-50 text-rose-700 ring-rose-200",
      fallback: "bg-slate-100 text-slate-600 ring-slate-200",
    },
    priority: {
      High: "bg-rose-100 text-rose-600",
      Medium: "bg-amber-100 text-amber-600",
      Low: "bg-emerald-100 text-emerald-600",
    },
    pipeline: {
      blue: "bg-blue-500",
      teal: "bg-teal-500",
      emerald: "bg-emerald-500",
      amber: "bg-amber-400",
    },
    leadSource: {
      blue: "bg-blue-500",
      teal: "bg-teal-500",
      amber: "bg-amber-400",
      slate: "bg-slate-400",
    },
  },
};

export const cx = (...classes) => classes.filter(Boolean).join(" ");
