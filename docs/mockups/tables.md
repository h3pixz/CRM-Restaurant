# Tables — схема зала

Роут: `/tables`

<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Restaurant CRM - Tables</title>
<!-- Tailwind CSS CDN with forms and container queries -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Custom Configuration -->
<script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            sidebar: '#202020',
            sidebarHover: '#2a2a2a',
            surfaceBg: '#f8f9fa',
            cardBg: '#f4f5f6',
            occBg: '#fbf5dc',
            occBorder: '#e8ddb5',
            occBadge: '#f8cf62',
            resBg: '#fae5e5',
            resBorder: '#edd0d0',
            resBadge: '#f6685e',
            freeBg: '#ffffff',
            freeBorder: '#d5d7da',
            freeBadge: '#bbf78a'
          }
        }
      }
    }
  </script>
<style data-purpose="custom-layout">
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 9999px;
    }
  </style>
</head>
<body class="bg-white text-gray-900 h-screen w-screen overflow-hidden flex flex-row select-none">
<!-- BEGIN: LeftSidebar -->
<aside class="w-64 bg-sidebar flex-shrink-0 flex flex-col justify-between h-full border-r border-neutral-800" data-purpose="sidebar">
<div>
<!-- Brand Logo / Name -->
<div class="px-6 pt-7 pb-5">
<h1 class="text-white text-sm font-bold tracking-[0.22em] uppercase">Restaurant CRM</h1>
</div>
<!-- Thin separator line -->
<div class="h-[1px] bg-neutral-700/60 mx-6 mb-6"></div>
<!-- Navigation items -->
<nav aria-label="Sidebar Navigation" class="px-4 space-y-3">
<!-- Active link: Tables -->
<a class="flex items-center space-x-3.5 px-4 py-3 rounded-lg bg-white text-neutral-900 font-medium shadow-sm transition-colors" href="#">
<svg class="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M8 21h8m-4-7v7m-7-14h14l-1.5 5.5a5.5 5.5 0 01-11 0L5 7zm2-3h10" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="text-sm font-semibold tracking-wide">Tables</span>
</a>
<!-- Inactive link: Orders -->
<a class="flex items-center space-x-3.5 px-4 py-3 rounded-lg bg-[#292929] text-neutral-300 hover:text-white transition-colors" href="#">
<svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="text-sm font-normal tracking-wide">Orders</span>
</a>
<!-- Inactive link: Statistics -->
<a class="flex items-center space-x-3.5 px-4 py-3 rounded-lg bg-[#292929] text-neutral-300 hover:text-white transition-colors" href="#">
<svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<circle cx="12" cy="12" r="9" stroke-width="1.8"></circle>
<path d="M12 3v9h9" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="text-sm font-normal tracking-wide">Statistics</span>
</a>
</nav>
</div>
</aside>
<!-- END: LeftSidebar -->
<!-- BEGIN: MainContentArea -->
<main class="flex-1 flex flex-col h-full bg-[#fbfbfb] overflow-y-auto custom-scrollbar">
<!-- BEGIN: TopBar -->
<header class="h-16 px-10 flex items-center justify-end space-x-6 shrink-0">
<!-- Notification Icon -->
<button aria-label="Notifications" class="text-neutral-700 hover:text-neutral-900 transition-colors" type="button">
<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.7" viewbox="0 0 24 24">
<path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
<!-- User Profile -->
<div class="flex items-center space-x-2.5 text-neutral-800 text-sm font-medium">
<svg class="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="tracking-tight">Okechukwu Andrey</span>
</div>
</header>
<!-- END: TopBar -->
<!-- BEGIN: PageContent -->
<div class="px-10 pb-12 flex-1 flex flex-col space-y-6">
<!-- Section Title -->
<h2 class="text-[28px] font-bold text-neutral-900 leading-tight">Tables</h2>
<!-- BEGIN: StatSummaryRow -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6" data-purpose="stat-summary-cards">
<!-- Free Stat Card -->
<div class="bg-[#f6f7f8] rounded-xl p-5 border border-neutral-100 flex flex-col justify-between h-28">
<span class="text-xs font-semibold text-neutral-400">Free</span>
<div class="flex items-center justify-between">
<span class="text-4xl font-bold text-neutral-900">13</span>
<div class="h-[1.5px] bg-neutral-300 flex-1 mx-6 rounded-full"></div>
<button class="bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-medium px-4 py-1.5 rounded shadow-2xs transition-colors">
              Show
            </button>
</div>
</div>
<!-- Occupied Stat Card -->
<div class="bg-[#f6f7f8] rounded-xl p-5 border border-neutral-100 flex flex-col justify-between h-28">
<span class="text-xs font-semibold text-neutral-400">Occupied</span>
<div class="flex items-center justify-between">
<span class="text-4xl font-bold text-neutral-900">4</span>
<div class="h-[1.5px] bg-neutral-300 flex-1 mx-6 rounded-full"></div>
<button class="bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-medium px-4 py-1.5 rounded shadow-2xs transition-colors">
              Show
            </button>
</div>
</div>
<!-- Reserved Stat Card -->
<div class="bg-[#f6f7f8] rounded-xl p-5 border border-neutral-100 flex flex-col justify-between h-28">
<span class="text-xs font-semibold text-neutral-400">Reserved</span>
<div class="flex items-center justify-between">
<span class="text-4xl font-bold text-neutral-900">4</span>
<div class="h-[1.5px] bg-neutral-300 flex-1 mx-6 rounded-full"></div>
<button class="bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-medium px-4 py-1.5 rounded shadow-2xs transition-colors">
              Show
            </button>
</div>
</div>
</section>
<!-- END: StatSummaryRow -->
<!-- BEGIN: FloorPlanGridContainer -->
<section class="bg-[#f6f7f8] rounded-2xl p-8 border border-neutral-100 flex-1 flex flex-col justify-between" data-purpose="table-floorplan">
<!-- Table Grid Layout: 6 columns per row -->
<div class="space-y-12">
<!-- Row 1: Tables 1, 2, 3, 4, 5, A2 -->
<div class="grid grid-cols-6 gap-6 items-start">
<!-- Table 1: Occupied -->
<div class="aspect-square bg-occBg border border-occBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">1</span>
<span class="bg-occBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Occ</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- Table 2: Reserved (22:30) -->
<div class="aspect-square bg-resBg border border-resBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">2</span>
<span class="bg-resBadge text-[10px] font-semibold text-white px-1.5 py-0.5 rounded">Res</span>
</div>
<div class="flex flex-col items-center justify-center -mt-2">
<span class="text-xs font-bold text-neutral-900 mb-1">22:30</span>
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
<div class="h-0"></div>
</div>
<!-- Table 3: Occupied -->
<div class="aspect-square bg-occBg border border-occBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">3</span>
<span class="bg-occBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Occ</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- Table 4: Free -->
<div class="aspect-square bg-freeBg border border-freeBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">4</span>
<span class="bg-freeBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Free</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- Table 5: Free -->
<div class="aspect-square bg-freeBg border border-freeBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">5</span>
<span class="bg-freeBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Free</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- Table A2: Free (VIP/Separate section) -->
<div class="aspect-square bg-freeBg border border-freeBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">A2</span>
<span class="bg-freeBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Free</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
</div>
<!-- Row 2: Tables 6, 7, 8, 9, 10, empty space -->
<div class="grid grid-cols-6 gap-6 items-start">
<!-- Table 6: Occupied -->
<div class="aspect-square bg-occBg border border-occBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">6</span>
<span class="bg-occBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Occ</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- Table 7: Occupied -->
<div class="aspect-square bg-occBg border border-occBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">7</span>
<span class="bg-occBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Occ</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- Table 8: Free -->
<div class="aspect-square bg-freeBg border border-freeBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">8</span>
<span class="bg-freeBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Free</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- Table 9: Free -->
<div class="aspect-square bg-freeBg border border-freeBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">9</span>
<span class="bg-freeBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Free</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- Table 10: Free -->
<div class="aspect-square bg-freeBg border border-freeBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">10</span>
<span class="bg-freeBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Free</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- 6th column spacer for alignment -->
<div class="aspect-square pointer-events-none"></div>
</div>
<!-- Row 3: Tables 11, 12, 13, 14, 15, A1 -->
<div class="grid grid-cols-6 gap-6 items-start">
<!-- Table 11: Reserved (18:00) -->
<div class="aspect-square bg-resBg border border-resBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">11</span>
<span class="bg-resBadge text-[10px] font-semibold text-white px-1.5 py-0.5 rounded">Res</span>
</div>
<div class="flex flex-col items-center justify-center -mt-2">
<span class="text-xs font-bold text-neutral-900 mb-1">18:00</span>
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
<div class="h-0"></div>
</div>
<!-- Table 12: Reserved (18:00) -->
<div class="aspect-square bg-resBg border border-resBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">12</span>
<span class="bg-resBadge text-[10px] font-semibold text-white px-1.5 py-0.5 rounded">Res</span>
</div>
<div class="flex flex-col items-center justify-center -mt-2">
<span class="text-xs font-bold text-neutral-900 mb-1">18:00</span>
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
<div class="h-0"></div>
</div>
<!-- Table 13: Free -->
<div class="aspect-square bg-freeBg border border-freeBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">13</span>
<span class="bg-freeBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Free</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- Table 14: Free -->
<div class="aspect-square bg-freeBg border border-freeBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">14</span>
<span class="bg-freeBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Free</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- Table 15: Free -->
<div class="aspect-square bg-freeBg border border-freeBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">15</span>
<span class="bg-freeBadge text-[10px] font-semibold text-neutral-800 px-1.5 py-0.5 rounded">Free</span>
</div>
<div class="flex justify-center items-center pb-2">
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<!-- Table A1: Reserved (21:00) -->
<div class="aspect-square bg-resBg border border-resBorder rounded-xl p-3 relative flex flex-col justify-between shadow-xs">
<div class="flex justify-between items-start">
<span class="font-bold text-sm text-neutral-800">A1</span>
<span class="bg-resBadge text-[10px] font-semibold text-white px-1.5 py-0.5 rounded">Res</span>
</div>
<div class="flex flex-col items-center justify-center -mt-2">
<span class="text-xs font-bold text-neutral-900 mb-1">21:00</span>
<svg class="w-4 h-4 text-neutral-700 stroke-[1.75]" fill="none" stroke="currentColor" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
<div class="h-0"></div>
</div>
</div>
</div>
</section>
<!-- END: FloorPlanGridContainer -->
</div>
<!-- END: PageContent -->
</main>
<!-- END: MainContentArea -->
</body></html>