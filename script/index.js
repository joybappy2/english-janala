const loadLessons = () => {
  const url = fetch("https://openapi.programming-hero.com/api/levels/all");
  const response = url.then((response) => response.json());
  const json = response.then((jsonData) => {
    displayLessons( jsonData.data );
  });
};


const loadlevelword = ( id ) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
  .then((response) => response.json())
    .then( ( data ) => {
      const lessonBtnClicked = document.getElementById( `lesson-btn-${ id }` )
      const lessonButtons = document.querySelectorAll( '.lesson-btn' )
      lessonButtons.forEach( btn => {
      btn.classList.remove('active')
  })
      lessonBtnClicked.classList.add('active')
    displaylevelword( data.data );
    });
};

const displaylevelword = (words) => {
  const wordContainer = document.getElementById( "word-container" );
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full space-y-4 py-5">
        <img src="./assets/alert-error.png" class="mx-auto" alt="">
        <p class="text-lg text-gray-500 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-medium text-3xl">নেক্সট Lesson এ যান</h2>
      </div>

      </section>
    `;
  }
  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
        
        <div class=" card bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
        <h2 class="font-bold text-3xl">${
          word.word ? word.word : "❌শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-bold text-lg">Meaning / Pronunciation</p>
        <p class="font-bangla font-medium text-lg">"${
          word.meaning ? word.meaning : "❌শব্দের অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "❌শব্দের উচ্চারণ পাওয়া যায়নি"
    }"</p>
        <div class="flex justify-between">
          <button class=" bg-[#1A91FF20] p-2 rounded-lg hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-info"></i>
          </button>
          <button class=" bg-[#1A91FF20] p-2 rounded-lg hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
        
        `;
    wordContainer.appendChild(wordCard);
  });
};

const displayLessons = (jsonData) => {
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";
  for (const data of jsonData) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        
        <button id="lesson-btn-${data.level_no}" onclick="loadlevelword(${data.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <span> <i class="fa-solid fa-book-open"></i> </span>
        Lesson- ${data.level_no}
        </button>
        
        `;
    lessonsContainer.appendChild(btnDiv);
  }
};
loadLessons();





// {
//     "id": 102,
//     "level_no": 2,
//     "lessonName": "Everyday Words"
// }

// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }
