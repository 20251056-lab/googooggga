// --- 互動功能 1：首頁圖片輪播 (保留備用) ---
let slideIndex = 1;
document.addEventListener("DOMContentLoaded", function() { showSlides(slideIndex); });
function moveSlide(n) { showSlides(slideIndex += n); }
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    if (slides.length === 0) return;
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    slides[slideIndex - 1].style.display = "block";
}
setInterval(function() { moveSlide(1); }, 3000);

// --- 互動功能 2：彈出優惠訊息 (首頁) ---
const promoBtn = document.getElementById("promoBtn");
const promoModal = document.getElementById("promoModal");
const closeBtn = document.querySelector(".close-btn");
const modalOkBtn = document.querySelector(".modal-ok-btn");

if (promoBtn && promoModal) {
    promoBtn.addEventListener("click", function() { promoModal.style.display = "block"; });
    closeBtn.addEventListener("click", function() { promoModal.style.display = "none"; });
    modalOkBtn.addEventListener("click", function() { promoModal.style.display = "none"; });
    window.addEventListener("click", function(event) {
        if (event.target == promoModal) { promoModal.style.display = "none"; }
    });
}

// --- 互動功能 3：點擊動物看詳細介紹 (產品頁) ---
// 約 100 字豐富版的動物資料！
const animalData = {
    cat: {
        name: "喵喵 🐱",
        title: "慵懶的沙發馬鈴薯",
        desc: "喵喵是動物設計坊裡最受歡迎的角色之一。她是一隻擁有粉紅色軟毛的貓咪，最大的愛好就是找尋家裡最溫暖、最柔軟的角落睡覺。一天二十四小時裡，她有大約十六個小時都在打呼嚕，剩下的八個小時則用來品嚐鮮嫩的小魚乾和追逐雷射筆的光點。雖然看起來總是懶洋洋的，但喵喵其實非常聰明且獨立，偶爾會用那雙無辜的大眼睛看著你，彷彿在說：「朕餓了，快奉上罐罐。」她也是個完美主義者，每次理毛都花上好久時間，非常愛乾淨。",
        design: "🎨 設計特色：軟綿綿的粉紅貓耳、水汪汪的無辜大眼、粉紅腮紅，以及微微揚起的神氣嘴角。",
        bgColor: "#fff0f0",
        borderColor: "#ffb7b2",
        textColor: "#ff7b81"
    },
    dog: {
        name: "旺財 🐶",
        title: "活力滿點的忠實好友",
        desc: "旺財絕對是動物設計坊裡的能量擔當！這隻有著一對垂垂棕色大耳朵的狗狗，永遠保持著滿滿的活力，最期待的就是主人下班回家，帶他去公園玩你最愛的我丟你撿遊戲。只要一看到飛盤或網球，他那雙圓滾滾的眼睛就會立刻發亮，尾巴搖得比電風扇還快。旺財心地善良、對人忠誠，是所有人最好的朋友。他偶爾會調皮地咬壞拖鞋，但只要看到他那無辜又開心的吐舌頭表情，你大概也捨不得罵他。他還有個絕招，就是會用鼻子輕輕推你的手，討摸討抱抱。",
        design: "🎨 設計特色：垂垂的棕色大耳朵、圓滾滾的黑眼珠、粉紅色的小舌頭，與永遠開心的燦爛笑容。",
        bgColor: "#fff9e6",
        borderColor: "#ffeaa7",
        textColor: "#d4a017"
    },
    bird: {
        name: "小藍 🐦",
        title: "圓滾滾的飛翔小高手",
        desc: "不要被小藍那圓滾滾、胖嘟嘟的藍色身軀給騙了，他可是個靈活的小飛俠！小藍是一隻非常愛唱歌的小鳥，每天清晨，他那清脆又響亮的啾啾聲，就是動物設計坊最準時的天然鬧鐘。他最熱愛的食物是黃澄澄的小米粒，並且喜歡站在窗邊觀察外面的世界。雖然體型嬌小，但小藍的志向可是非常遠大的，他總幻想著有一天能飛越彩虹的盡頭。他也是個小藝術家，喜歡用自己短短的黃色小腳丫，在設計圖紙上踩出獨一無二的腳印畫。",
        design: "🎨 設計特色：圓潤的藍色身體、亮黃色的尖銳小嘴與短腳丫、頭頂上俏皮的一撮呆毛。",
        bgColor: "#eef5ff",
        borderColor: "#cce3ff",
        textColor: "#5a8bd6"
    },
    panda: {
        name: "圓仔 🐼",
        title: "專業的竹子品鑑師",
        desc: "圓仔是動物設計坊裡最慵懶、也最可愛的招牌吉祥物。這隻黑白相間的大熊貓，每天的生活哲學就只有兩件事：吃和睡。他對竹子有著極高的要求，只挑選最鮮嫩、最翠綠的竹葉來品嚐，吃飽後就會心滿意足地躺在地上打滾。他圓滾滾的肚子是他最大的特徵，也是他最溫暖的枕頭。雖然看起來笨手笨腳，但他其實是個爬樹高手，只是因為太懶惰了，大部分時間都寧願待在樹下發呆。他最大的心願就是設計出一個永遠不會沒電的竹子自動販賣機。",
        design: "🎨 設計特色：經典的黑白配色、大大的黑眼圈、圓滾滾的肚子，以及憨厚老實的療癒表情。",
        bgColor: "#f0f5f0",
        borderColor: "#d4f5b8",
        textColor: "#5a8f3c"
    },
    frog: {
        name: "呱呱 🐸",
        title: "池塘邊的跳躍高手",
        desc: "呱呱是一隻充滿活力且超級樂觀的青蛙。他最喜歡下雨天，因為雨水會讓他的皮膚感覺濕濕涼涼的，非常舒服。他有一身亮綠色的帥氣外衣，以及兩顆大大的凸眼，這讓他即使在水下也能把世界看得清清楚楚。呱呱的舌頭超級長，可以在一眨眼間就精準捕捉到飛過的無辜小蟲子，是池塘裡公認的昆蟲剋星。他也是動物設計坊的運動健將，最愛舉辦跳遠比賽。呱呱個性開朗，最喜歡和朋友們一起坐在荷葉上開演唱會，大聲唱著呱呱呱的交響曲。",
        design: "🎨 設計特色：亮綠色的光滑皮膚、兩顆大大的凸眼、大大的微笑曲線，以及充滿活力的四肢。",
        bgColor: "#f2e6ff",
        borderColor: "#e2c4ff",
        textColor: "#8e44ad"
    },
    fox: {
        name: "阿狐 🦊",
        title: "森林裡的小聰明",
        desc: "阿狐是動物設計坊裡最聰明的點子王。他擁有漂亮橘色毛髮與雪白胸口，以及一條超級蓬鬆、柔軟的巨大尾巴，冬天時常拿來當作圍巾保暖。他最喜歡在森林裡玩捉迷藏，憑著敏銳的嗅覺和靈活的身手，大家幾乎都找不到他。雖然常常給人狡猾的印象，但阿狐其實非常講義氣，只要朋友有難，他絕對第一個跳出來幫忙。他也是個美食家，最愛偷偷溜進廚房，研究各種人類的甜點食譜，希望能設計出世界上最好吃的莓果派，是個充滿魅力的鬼靈精怪。",
        design: "🎨 設計特色：橘色與白色的雙色毛髮、尖尖的耳朵、帥氣的蓬鬆尾巴，以及透著自信的光芒眼神。",
        bgColor: "#fff0e6",
        borderColor: "#ffd1b3",
        textColor: "#d35400"
    }
};

function showAnimalInfo(animalKey) {
    const displayArea = document.getElementById("animalInfoDisplay");
    
    if (displayArea) {
        const animal = animalData[animalKey];
        
        // 改變資訊框的顏色以配合動物
        displayArea.style.backgroundColor = animal.bgColor;
        displayArea.style.borderColor = animal.borderColor;
        displayArea.style.transform = "scale(1.02)";
        
        // 填入豐富的資訊
        displayArea.innerHTML = `
            <div style="width: 100%;">
                <h2 style="color: ${animal.textColor}; text-align: center;">${animal.name}</h2>
                <h4 style="text-align: center; color: #666; margin-bottom: 15px;">— ${animal.title} —</h4>
                <p><strong>📖 小檔案：</strong><br>${animal.desc}</p>
                <p style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed #ddd; font-size: 0.95rem; color: #555;">${animal.design}</p>
            </div>
        `;
        
        // 彈跳動畫
        setTimeout(() => { displayArea.style.transform = "scale(1)"; }, 200);
    }
}