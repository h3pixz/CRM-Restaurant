# Tables — заказ столика

Роут: `/tables/:tableId`

<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Restaurant CRM - Table 7</title>
<!-- Tailwind CSS v3 with Plugins -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Configuration -->
<script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            sidebar: '#1E1E24',
            'sidebar-hover': '#2B2B32',
            'sidebar-border': '#33333C',
            'table-bg': '#F9FAFA',
            'custom-dark': '#1F242E'
          }
        }
      }
    }
  </script>
<!-- Custom Styling -->
<style data-purpose="custom-scrollbars">
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #D1D5DB;
      border-radius: 3px;
    }
  </style>
</head>
<body class="bg-[#F0F2F5] text-gray-900 font-sans antialiased min-h-screen flex flex-col justify-between">
<!-- BEGIN: AppContainer -->
<div class="flex min-h-screen w-full">
<!-- BEGIN: LeftSidebar -->
<aside class="w-60 bg-[#1E1E24] text-white flex flex-col flex-shrink-0" data-purpose="main-sidebar">
<!-- CRM Brand Header -->
<div class="px-6 pt-7 pb-5">
<h1 class="text-sm font-semibold tracking-wider text-gray-200 uppercase">RESTAURANT CRM</h1>
<div class="h-[1px] bg-[#32323A] mt-5 w-full"></div>
</div>
<!-- Navigation Links -->
<nav class="flex-1 px-4 space-y-2 mt-2" data-purpose="sidebar-navigation">
<!-- Tables (Selected/Active) -->
<a class="flex items-center gap-3.5 px-4 py-3 rounded-lg bg-[#2E2E36] text-gray-100 font-medium text-sm transition-colors" href="#">
<!-- Glass/Table icon -->
<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M8 21h8m-4-7v7m-7-14h14l-2 5a5 5 0 01-5 4 5 5 0 01-5-4l-2-5z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span>Tables</span>
</a>
<!-- Orders -->
<a class="flex items-center gap-3.5 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#282830] font-medium text-sm transition-colors" href="#">
<!-- Clipboard icon -->
<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span>Orders</span>
</a>
<!-- Statistics -->
<a class="flex items-center gap-3.5 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#282830] font-medium text-sm transition-colors" href="#">
<!-- Chart Pie icon -->
<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span>Statistics</span>
</a>
</nav>
</aside>
<!-- END: LeftSidebar -->
<!-- BEGIN: MainContentArea -->
<main class="flex-1 flex flex-col bg-white overflow-x-hidden min-h-screen" data-purpose="content-area">
<!-- Top Header Navigation & User Profile -->
<header class="h-16 px-8 flex items-center justify-between border-b border-transparent" data-purpose="top-header">
<div></div>
<!-- Profile / Alerts Section -->
<div class="flex items-center gap-6">
<button aria-label="Notifications" class="text-gray-700 hover:text-black focus:outline-none" type="button">
<!-- Bell icon -->
<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
<div class="flex items-center gap-2.5 text-sm font-medium text-gray-900 cursor-pointer">
<!-- User avatar/icon -->
<svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span>Okechukwu Andrey</span>
</div>
</div>
</header>
<!-- Main Order Body -->
<div class="px-8 pb-10 flex-1 flex flex-col justify-between">
<section>
<!-- Order Title and Back Button -->
<div class="flex items-start gap-4 mb-5" data-purpose="table-heading">
<button aria-label="Back" class="mt-1 text-gray-700 hover:text-black transition-colors">
<!-- Back arrow -->
<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24">
<path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
<div>
<h2 class="text-2xl font-bold text-gray-950 tracking-tight">Table 7</h2>
<p class="text-xs text-gray-400 font-medium mt-0.5">Order details</p>
</div>
</div>
<!-- Order Table Card -->
<div class="bg-[#F8F9FA] rounded-2xl p-6 shadow-sm border border-gray-100" data-purpose="order-card">
<!-- Table Header Row -->
<div class="grid grid-cols-12 items-center text-xs font-medium text-gray-400 pb-3 mb-2 px-3">
<div class="col-span-1 flex items-center">
<input class="w-4 h-4 rounded border-gray-300 text-black focus:ring-0 cursor-pointer" type="checkbox"/>
</div>
<div class="col-span-5">Dish</div>
<div class="col-span-2 text-left">Price</div>
<div class="col-span-4 text-left">Amount</div>
</div>
<!-- Category: Appetizer -->
<div class="mb-4">
<div class="flex items-center gap-2 py-1.5 px-3">
<span class="w-5 h-5 bg-[#2B2E35] text-white flex items-center justify-center rounded text-xs font-semibold">+</span>
<span class="text-xs font-semibold text-gray-400 tracking-wide">Appetizer</span>
</div>
<!-- Dish Item: Bruschetta -->
<div class="grid grid-cols-12 items-center px-3 py-2 hover:bg-gray-100/60 rounded-xl transition-colors">
<div class="col-span-1 flex items-center">
<input class="w-4 h-4 rounded border-gray-300 text-black focus:ring-0 cursor-pointer" type="checkbox"/>
</div>
<div class="col-span-5 flex items-center gap-3">
<img alt="Bruschetta" class="w-9 h-9 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2RnKSYuyVgJZPshijW1COmulLQJaWL2F6_Z8SCcR0AfT1HtCqr6p1jHsJvxFX1iHSoNuDzLLukVEIOLb3OSEY3ExmRSCYFjidImJiVJ7FHNurE1_xlTvAFI-kzfV1Q7NkD3s3g_zm6GGFHEH_DY7EvcuoDPNcprK3WZn7nLqeDbIN2wMsbeU04ha9q-QkwsvEW6U6BDCyQ4ZoG7V_ZpftnpaluYxgz5DfU_MsvWIG"/>
<span class="text-sm font-medium text-gray-800">Bruschetta</span>
</div>
<div class="col-span-2 text-sm font-medium text-gray-800">$8.99</div>
<div class="col-span-4 flex items-center justify-between">
<!-- Stepper -->
<div class="flex items-center gap-2">
<button class="w-6 h-6 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold leading-none">-</button>
<span class="text-xs font-semibold w-5 text-center text-gray-800">1</span>
<button class="w-6 h-6 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold leading-none">+</button>
</div>
<!-- Right actions -->
<div class="flex items-center gap-4 text-gray-600">
<button class="hover:text-black">
<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
<button class="hover:text-black">
<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.6" viewbox="0 0 24 24">
<circle cx="12" cy="12" r="9"></circle>
<path d="M9 9l6 6m0-6l-6 6" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
</div>
</div>
</div>
</div>
<!-- Category: Main Course -->
<div class="mb-4">
<div class="flex items-center gap-2 py-1.5 px-3">
<span class="w-5 h-5 bg-[#2B2E35] text-white flex items-center justify-center rounded text-xs font-semibold">+</span>
<span class="text-xs font-semibold text-gray-400 tracking-wide">Main Course</span>
</div>
<!-- Dish Item: Grilled Chicken Caesar Salad -->
<div class="grid grid-cols-12 items-center px-3 py-2 hover:bg-gray-100/60 rounded-xl transition-colors">
<div class="col-span-1 flex items-center">
<input class="w-4 h-4 rounded border-gray-300 text-black focus:ring-0 cursor-pointer" type="checkbox"/>
</div>
<div class="col-span-5 flex items-center gap-3">
<img alt="Caesar Salad" class="w-9 h-9 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcm0vkF-EhbxlDxybZfPtec3QEWJxNluMyd-243MQ3SVoR5-Oaz6SD2IcAm2geFymgoZ6BY8qZqwVPD1UVeuYQ8-073V_PZ1wPHTvOVkt_52uAnS5ZFvd5nNqDl5DBmTcLqQ7SOSKhpjXHCtbRvZPTqNwsPQUHUlyCTgrpSdT6h3fxUwpIm8ERpZwqXKBsESqG2TkywQULWKe_fdaK5c02uvI6uqNzIExpxigAebWw"/>
<span class="text-sm font-medium text-gray-800">Grilled Chicken Caesar Salad</span>
</div>
<div class="col-span-2 text-sm font-medium text-gray-800">$12.99</div>
<div class="col-span-4 flex items-center justify-between">
<!-- Stepper -->
<div class="flex items-center gap-2">
<button class="w-6 h-6 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold leading-none">-</button>
<span class="text-xs font-semibold w-5 text-center text-gray-800">1</span>
<button class="w-6 h-6 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold leading-none">+</button>
</div>
<!-- Right actions -->
<div class="flex items-center gap-4 text-gray-600">
<button class="hover:text-black">
<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
<button class="hover:text-black">
<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.6" viewbox="0 0 24 24">
<circle cx="12" cy="12" r="9"></circle>
<path d="M9 9l6 6m0-6l-6 6" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
</div>
</div>
</div>
<!-- Dish Item: Classic Cheeseburger with Fries -->
<div class="grid grid-cols-12 items-center px-3 py-2 hover:bg-gray-100/60 rounded-xl transition-colors">
<div class="col-span-1 flex items-center">
<input class="w-4 h-4 rounded border-gray-300 text-black focus:ring-0 cursor-pointer" type="checkbox"/>
</div>
<div class="col-span-5 flex items-center gap-3">
<img alt="Cheeseburger" class="w-9 h-9 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZV1lE6jxWXTcp9F5RohRATGt3esIjLIHx_fRAcCrz8LbTcfnWrzc5hRgq_agHUhJEoMP7iLFch3Dbd40I49-Oebbc5q2030Z4jdginYca8fU090hoNzvYF870rWrnwmyRDwWKkyaSAfYN4HYwvSH6FzTERq_ODJWuSBdhnxindnmKEKTTgtUuySMruPmfb_nmewPrIVXb9DOrunwxzUcXtzQDuepn2uicIw7ZnSfE"/>
<span class="text-sm font-medium text-gray-800">Classic Cheeseburger with Fries</span>
</div>
<div class="col-span-2 text-sm font-medium text-gray-800">$14.99</div>
<div class="col-span-4 flex items-center justify-between">
<!-- Stepper -->
<div class="flex items-center gap-2">
<button class="w-6 h-6 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold leading-none">-</button>
<span class="text-xs font-semibold w-5 text-center text-gray-800">1</span>
<button class="w-6 h-6 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold leading-none">+</button>
</div>
<!-- Right actions: Solid black active comment bubble -->
<div class="flex items-center gap-4 text-gray-600">
<button class="text-gray-900">
<svg class="w-4 h-4 fill-current" viewbox="0 0 24 24">
<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"></path>
</svg>
</button>
<button class="hover:text-black">
<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.6" viewbox="0 0 24 24">
<circle cx="12" cy="12" r="9"></circle>
<path d="M9 9l6 6m0-6l-6 6" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
</div>
</div>
</div>
</div>
<!-- Category: Drinks -->
<div class="mb-4">
<div class="flex items-center gap-2 py-1.5 px-3">
<span class="w-5 h-5 bg-[#2B2E35] text-white flex items-center justify-center rounded text-xs font-semibold">+</span>
<span class="text-xs font-semibold text-gray-400 tracking-wide">Drinks</span>
</div>
<!-- Dish Item: Iced Tea -->
<div class="grid grid-cols-12 items-center px-3 py-2 hover:bg-gray-100/60 rounded-xl transition-colors">
<div class="col-span-1 flex items-center">
<input class="w-4 h-4 rounded border-gray-300 text-black focus:ring-0 cursor-pointer" type="checkbox"/>
</div>
<div class="col-span-5 flex items-center gap-3">
<img alt="Iced Tea" class="w-9 h-9 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-CzlMWw0f-fH0SOZkqfzkP52V8CWLaiOmJgIFpifcFTvhR9S1vKUAcWT6p-eGvmUUGlLq9T7MjJgEUhtzi5VgYUekO1IYd7ePYchQCHmexfWyM7NwZAVcedMxenR7Dwx1sMdzdEIL6-uSCWNnSjIeEHmHmFC3dJevINyNZBTmM3KxR2oRrKddIbZilgbtgfGbP_gxUy5744i5y7MglW_eOohGlCg7PCK_t4-jjuJr"/>
<span class="text-sm font-medium text-gray-800">Iced Tea</span>
</div>
<div class="col-span-2 text-sm font-medium text-gray-800">$2.99</div>
<div class="col-span-4 flex items-center justify-between">
<!-- Stepper & Subtotal -->
<div class="flex items-center gap-6">
<div class="flex items-center gap-2">
<button class="w-6 h-6 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold leading-none">-</button>
<span class="text-xs font-semibold w-5 text-center text-gray-800">2</span>
<button class="w-6 h-6 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold leading-none">+</button>
</div>
<span class="text-sm font-medium text-gray-800">$5.98</span>
</div>
<!-- Right actions -->
<div class="flex items-center gap-4 text-gray-600">
<button class="hover:text-black">
<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
<button class="hover:text-black">
<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.6" viewbox="0 0 24 24">
<circle cx="12" cy="12" r="9"></circle>
<path d="M9 9l6 6m0-6l-6 6" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
</div>
</div>
</div>
</div>
<!-- Category: Dessert -->
<div class="mb-2">
<div class="flex items-center gap-2 py-1.5 px-3">
<span class="w-5 h-5 bg-[#2B2E35] text-white flex items-center justify-center rounded text-xs font-semibold">+</span>
<span class="text-xs font-semibold text-gray-400 tracking-wide">Dessert</span>
</div>
<!-- Dish Item: New York Cheesecake -->
<div class="grid grid-cols-12 items-center px-3 py-2 hover:bg-gray-100/60 rounded-xl transition-colors">
<div class="col-span-1 flex items-center">
<input class="w-4 h-4 rounded border-gray-300 text-black focus:ring-0 cursor-pointer" type="checkbox"/>
</div>
<div class="col-span-5 flex items-center gap-3">
<img alt="Cheesecake" class="w-9 h-9 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3z4Qp8WirzGRSQUwC32C6gWv_ljtkkQhMSACQApwyKVHlNV2fkGaJ5vmJOtEPR9yU9xNTHKiibpgaglLQlHMYlpks3uE2sls8mOTlbxsvFOp-9YTisyT_afg3uIFardNW0ZIFFwEltiOJC8Y3mJAnWZhkGWX9JwUD9A6Ud9UQHzPCWpmqfcfVw4Hd-Mb-rrvLslHVNbbRwgiu-uQjSZoekGzuITR0cAbTyHrUTAYX"/>
<span class="text-sm font-medium text-gray-800">New York Cheesecake</span>
</div>
<div class="col-span-2 text-sm font-medium text-gray-800">$6.99</div>
<div class="col-span-4 flex items-center justify-between">
<!-- Stepper -->
<div class="flex items-center gap-2">
<button class="w-6 h-6 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold leading-none">-</button>
<span class="text-xs font-semibold w-5 text-center text-gray-800">1</span>
<button class="w-6 h-6 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold leading-none">+</button>
</div>
<!-- Right actions -->
<div class="flex items-center gap-4 text-gray-600">
<button class="hover:text-black">
<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
<button class="hover:text-black">
<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.6" viewbox="0 0 24 24">
<circle cx="12" cy="12" r="9"></circle>
<path d="M9 9l6 6m0-6l-6 6" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- BEGIN: BottomTotalFooter -->
<footer class="mt-8" data-purpose="total-actions-container">
<p class="text-xs font-bold text-gray-900 mb-2">Total</p>
<div class="border border-gray-950 rounded-md p-4 flex items-center justify-between">
<span class="text-3xl font-semibold tracking-tight text-gray-950">$49,94</span>
<div class="flex items-center gap-3">
<button class="px-5 py-2.5 rounded-lg border border-gray-900 font-semibold text-xs tracking-wide text-gray-900 hover:bg-gray-100 transition-colors" type="button">
                Discount
              </button>
<button class="px-5 py-2.5 rounded-lg bg-[#1E242C] text-white font-semibold text-xs tracking-wide hover:bg-black transition-colors shadow-sm" type="button">
                Check Order
              </button>
</div>
</div>
</footer>
<!-- END: BottomTotalFooter -->
</div>
</main>
<!-- END: MainContentArea -->
</div>
<!-- END: AppContainer -->
</body></html>