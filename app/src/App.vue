<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Profile from './components/profile/Profile.vue'


</script>

<template>
  <div class="flex flex-col h-screen justify-between bg-[#F5F5F5]">
    <header class=" bg-white sticky top-0">
    <div class="inset-x-0 top-0 bg-[#F5F5F5]">
      <nav>
        <div class="bg-gradient-to-b from-[#D61111] via-[#9B0000] to-[#4E0000] p-5">
          <div class="flex flex-row justify-center">
            
            <div class="flex-none">
              <img alt="Maethongbai LOGO" class="logo" src="@/assets/LOGO.png" width="175" height="61.4" />
            </div>

            <div>
              <div>

                <form class="flex items-center min-w-[50%]">   
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                      </div>
                      <input type="text" id="simple-search" class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="ค้นหา" required>
                  </div>
                  <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-[#FFD12F] rounded-lg hover:bg-[#FFC700] focus:ring-4 focus:outline-none">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                      <span class="sr-only">Search</span>
                  </button>
                </form>

              </div>

              <div class="text-white mt-4">
                <RouterLink to="/" class="mr-2">หน้าหลัก</RouterLink>
                <!-- <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/test">Test</RouterLink> -->
                <RouterLink to="/onsitesale/create" class="m-4">ขายทอง</RouterLink>
                <RouterLink to="/redemption/create" class="m-4">รับซื้อทอง</RouterLink>
                <RouterLink to="/custom_order/create" class="m-4">สร้างงานสั่งทอง</RouterLink>
                <!-- <RouterLink to="/income/create" class="m-4">เพิ่มรายการรับเงิน</RouterLink>
                <RouterLink to="/withdrawal/create" class="m-4">เพิ่มรายการเบิกเงิน</RouterLink> -->
                <RouterLink to="/stock/create" class="m-4">เพิ่มทองลงสต็อก</RouterLink>
                <RouterLink to="/stock/view" class="m-4">สถานะทองที่เพิ่ม</RouterLink>
              </div>
                
            </div>

            <Profile class="text-white pt-2 pl-24 text-right"></Profile>
          </div>
      </div>

      </nav>
      
      
    </div>
  </header>
  
  <body class="bg-[#F5F5F5]">
    <RouterView />
  </body>

  <footer>
    <div class="bg-gradient-to-b from-[#D61111] via-[#9B0000] to-[#4E0000] h-[200px] items-center justify-center flex flex-row justify-center">
      <div class="w-[1200px]">
        <div class="flex flex-row justify-center grid grid-cols-3 text-center">
        <div>
          <div class="flex flex-col justify-center">
            <img alt="Maethongbai LOGO" class="mx-auto" src="@/assets/LOGO.png" width="228" height="84" />
            <p class="text-white mt-5">ห้างทองแม่ทองใบ คลาสสิก เดอะมอลล์บางแค<br>
                                        ซื้อ-ขาย ทองแท่ง ทองรูปพรรณ มาตรฐาน</p>
          </div>
        </div>

        <div class="mt-8">
          <div class="flex flex-col justify-center text-white text-left">
            <p class="text-bold text-xl"><b>ติดต่อเรา:</b></p>
            <p> <b>โทร: </b>02-4549398-9 <br>
                 <b>ที่ตั้ง: </b>275 หมู่ 1 ชั้น G เดอะมอลล์บางแค ถนนเพชรเกษม <br> แขวงบางแคเหนือ กรุงเทพมหานคร 10160 </p>
          </div>
        </div>

        <div class="mt-8">
          <div class="flex flex-col justify-center text-white text-left">
            <p class="text-bold text-xl"><b>ติดตามเรา:</b></p>
            <p> FB: ห้างทองแม่ทองใบ คลาสสิก เดอะมอลล์บางแค <br>
                Line id: mtcbangkae <br>
                Instagram: mtcbangkae <br>
            </p>
          </div>
        </div>

      </div>
      </div>
      
      
    </div>
  </footer>

  </div>
  
</template>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
