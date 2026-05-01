// =========================================
// ЛАБОРАТОРНА 6: Зовнішній файл скриптів
// =========================================

function playMovieQuiz() {
    let correctYear = 2014;
    let attempts = 3;
    let userGuess;
    let isGuessed = false;

    alert("Вітаємо у міні-грі для справжніх кіноманів!\nСпробуй вгадати рік виходу фільму 'Інтерстеллар' (режисер Крістофер Нолан).");

    while (attempts > 0) {
        userGuess = prompt("Введіть рік виходу фільму. У вас залишилось спроб: " + attempts);
        if (userGuess === null) {
            alert("Гру скасовано. Повертайся, коли будеш готовий!");
            break;
        }
        userGuess = Number(userGuess);
        if (userGuess === correctYear) {
            alert("Бінго! Ти справжній знавець кіно. Це дійсно 2014 рік.");
            isGuessed = true;
            break;
        } else if (userGuess > correctYear) {
            alert("Ні, фільм вийшов трохи раніше.");
        } else if (userGuess < correctYear) {
            alert("Ні, фільм вийшов трохи пізніше.");
        }
        attempts--;
    }
    if (attempts === 0 && isGuessed === false) {
        alert("На жаль, спроби вичерпано. Правильна відповідь: " + correctYear + " рік.");
    }
}

function showDeveloperInfo(lastName, firstName, position = "Студент-розробник") {
    alert("Інформація про розробника сайту:\n\n" + lastName + " " + firstName + "\nПосада: " + position);
}

function sendNews() {
    let title = prompt("Введіть короткий заголовок новини:");
    if (title === null) return;
    let newsText = prompt("Введіть повний текст новини:");
    if (newsText === null) return;

    if (title.length > newsText.length) {
        alert("Заголовок виявився довшим за текст!\nОсь він: " + title);
    } else if (newsText.length > title.length) {
        alert("Текст довший за заголовок!\nОсь він: " + newsText);
    } else {
        alert("Заголовок і текст мають однакову довжину!");
    }
}

function activateCinemaMode() {
    document.body.classList.add("cinema-mode");
    alert("🍿 Режим кінотеатру увімкнено! Світло увімкнеться автоматично через 30 секунд.");
    setTimeout(function() {
        document.body.classList.remove("cinema-mode");
    }, 30000);
}

function redirectToContacts() {
    let confirmMove = confirm("Для замовлення реклами потрібно зв'язатися з нашою редакцією. Переходимо до сторінки контактів?");
    if (confirmMove) {
        window.location.href = "contacts.html";
    }
}

// СИСТЕМА КОМЕНТАРІВ
function toggleComments() {
    const box = document.getElementById("comments-box");
    box.style.display = (box.style.display === "none" || box.style.display === "") ? "block" : "none";
}

function addComment() {
    const input = document.getElementById("comment-input");
    const list = document.getElementById("comments-list");
    const placeholder = document.getElementById("no-comments-msg");

    if (input.value.trim() === "") return;

    // 1. СТВОРЕННЯ: createElement
    const item = document.createElement("div");
    item.className = "comment-item"; 

    // 2. ТЕКСТОВИЙ ВУЗОЛ ТА nodeValue
    const textNode = document.createTextNode("");
    textNode.nodeValue = input.value; 

    // 3. ВЛАСТИВІСТЬ innerHTML
    const nameTag = document.createElement("b");
    nameTag.innerHTML = "🎬 Гість: "; 

    // 4. ВСТАВКА: append
    item.append(nameTag, textNode);

    // 5. МЕТОД after та textContent
    const timeTag = document.createElement("small");
    timeTag.textContent = " (щойно) ";
    nameTag.after(timeTag);

    // 6. ВИДАЛЕННЯ: remove
    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.className = "delete-btn";
    delBtn.onclick = function() {
        item.remove();
        updateCounter();
    };
    item.append(delBtn);

    // 7. ВСТАВКА НА ПОЧАТОК: prepend
    list.prepend(item);

    // 8. ВЛАСТИВІСТЬ outerHTML
    console.log("HTML коментаря:", item.outerHTML);

    updateCounter();
    input.value = ""; 
}

// МЕТОД querySelectorAll та replaceWith
function updateCounter() {
    const all = document.querySelectorAll("#comments-list > .comment-item");
    const placeholder = document.getElementById("no-comments-msg");
    
    if (placeholder) {
        const counter = document.createElement("p");
        counter.id = "no-comments-msg";
        counter.style.fontWeight = "bold";
        counter.textContent = "Кількість коментарів: " + all.length;
        placeholder.replaceWith(counter);
    }
}

//
// ЛАБОРАТОРНА 7: Події, Обробники, Спливання
//

let currentRating = 0;

// 1. Призначення функції-обробника через АТРИБУТ (для 1-ї зірки)
// Викликається безпосередньо з HTML: onclick="rateStarAttr(1)"
function rateStarAttr(value) {
    updateStars(value);
    console.log("Спрацював обробник через АТРИБУТ: Обрано зірку 1");
}

// Функція оновлення візуального стану зірок
function updateStars(value) {
    currentRating = value;
    const resultText = document.getElementById("rating-result");
    if (resultText) {
        resultText.innerText = "Ваша оцінка: " + value;
    }
    
    const stars = document.querySelectorAll("#stars-container .star");
    stars.forEach((star, index) => {
        if (index < value) {
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }
    });
}

// Використовуємо DOMContentLoaded, щоб переконатися, що елементи існують на сторінці
document.addEventListener("DOMContentLoaded", () => {
    const star2 = document.getElementById("star2");
    const submitBtn = document.getElementById("submit-rating-btn");
    const ratingContainer = document.getElementById("video-rating-container");

    // Перевіряємо, чи ми знаходимося на сторінці "Про портал", де є цей віджет
    if (!ratingContainer) return;

    // 2. Призначення функції-обробника через ВЛАСТИВІСТЬ (для 2-ї зірки)
    star2.onclick = function() {
        updateStars(2);
        console.log("Спрацював обробник через ВЛАСТИВІСТЬ: Обрано зірку 2");
    };

    // 3. Об’єкт з методом handleEvent (Делегування подій та event.currentTarget)
    const RatingTracker = {
        handleEvent(event) {
            // ДЕЛЕГУВАННЯ: перевіряємо, чи клік був саме по елементу з класом 'star'
            if (event.target.classList.contains("star")) {
                const val = event.target.getAttribute("data-val");
                if (val) {
                    updateStars(val);
                    console.log("Спрацювало ДЕЛЕГУВАННЯ: Обрано зірку " + val);
                }
            }
            // Виводимо поточний елемент, до якого прив'язаний обробник (весь контейнер)
            console.log("Подія оброблена контейнером (currentTarget):", event.currentTarget.id);
        }
    };

    // Призначаємо об'єкт обробником через addEventListener (подія click)
    ratingContainer.addEventListener("click", RatingTracker);

    // 4. ДВА різні обробники на одну подію (для кнопки підтвердження)
    function showThankYouMessage() {
        if (currentRating > 0) {
            alert("Дякуємо! Ваша оцінка (" + currentRating + " з 5) врахована.");
        } else {
            alert("Будь ласка, оберіть хоча б одну зірку!");
        }
    }

    function lockRatingWidget() {
        if (currentRating === 0) return; // Якщо не оцінили, не блокуємо

        submitBtn.innerText = "Оцінка збережена";
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = "#7f8c8d";
        submitBtn.style.cursor = "not-allowed";

        // 5. Видалення об’єкта-обробника використовуючи removeEventListener
        ratingContainer.removeEventListener("click", RatingTracker);
        
        // Видаляємо властивість onclick для другої зірки
        star2.onclick = null;
        
        // Змінюємо атрибут для першої зірки (робимо неактивною)
        document.getElementById("star1").onclick = null;
        
        document.getElementById("stars-container").style.cursor = "default";
        console.log("Віджет заблоковано: removeEventListener застосовано успішно.");
    }

    // Призначаємо ОБИДВІ функції на одну подію 'click' кнопки
    submitBtn.addEventListener("click", showThankYouMessage);
    submitBtn.addEventListener("click", lockRatingWidget);
});

//
// ЛАБОРАТОРНА 7 (Частина 2): Список, Меню та Патерн "Поведінка"
//

document.addEventListener("DOMContentLoaded", () => {

    //
    // 1. Делегування для списку (підсвічування при кліку)
    //
    const genreList = document.getElementById("genre-list");
    
    if (genreList) {
        genreList.onclick = function(event) {
            if (event.target.tagName !== 'LI') {
                return;
            }
            
            const allItems = genreList.querySelectorAll('li');
            for (let item of allItems) {
                item.classList.remove('active-genre');
            }
            
            event.target.classList.add('active-genre');
        };
    }

    //
    // 2. Делегування для меню (використання data-action та бази фільмів)
    //
    const movieMenu = document.getElementById("movie-menu");
    
    // Створюємо нашу міні-базу даних
    const movieDatabase = [
        { title: "Інтерстеллар", genre: "Наукова фантастика" },
        { title: "Дюна: Частина друга", genre: "Наукова фантастика" },
        { title: "Той, хто біжить по лезу 2049", genre: "Наукова фантастика" },
        { title: "Месники: Завершення", genre: "Кінокомікси" },
        { title: "Бетмен (2022)", genre: "Кінокомікси" },
        { title: "Людина-павук: Крізь Всесвіт", genre: "Кінокомікси" },
        { title: "Сяйво", genre: "Хоррор" },
        { title: "Чужий: Ромул", genre: "Хоррор" },
        { title: "Тихе місце", genre: "Хоррор" },
        { title: "Дедпул і Росомаха", genre: "Комедія" },
        { title: "Погані хлопці до кінця", genre: "Комедія" },
        { title: "Круті чуваки", genre: "Комедія" }
    ];
    
    if (movieMenu) {
        class MenuMethods {
            search() { 
                // Шукаємо, який жанр зараз підсвічений (має клас active-genre)
                const activeItem = document.querySelector('.active-genre');
                
                if (!activeItem) {
                    alert("⚠️ Спочатку оберіть жанр зі списку вище!");
                    return; // Зупиняємо функцію, якщо жанр не обрано
                }

                // Отримуємо текст обраного жанру (наприклад, "🛸 Наукова фантастика")
                const selectedGenreText = activeItem.innerText;
                
                // Фільтруємо нашу базу: шукаємо фільми, жанр яких співпадає з обраним
                const results = movieDatabase.filter(movie => selectedGenreText.includes(movie.genre));
                
                if (results.length > 0) {
                    // Збираємо назви знайдених фільмів у гарний список
                    const titlesList = results.map(m => m.title).join('\n🎬 ');
                    alert("🔍 Ось найкращі варіанти для вас:\n\n🎬 " + titlesList);
                } else {
                    alert("На жаль, фільмів у цьому жанрі поки немає в базі.");
                }
            }
            
            random() { 
                // Беремо випадкове число від 0 до кількості фільмів у базі
                const randomIndex = Math.floor(Math.random() * movieDatabase.length);
                const randomMovie = movieDatabase[randomIndex]; // Дістаємо випадковий фільм
                
                alert(`🎲 Сьогодні дивимось випадковий хіт:\n\n"${randomMovie.title}"\n(Жанр: ${randomMovie.genre})`); 
            }
            
            reset() { 
                const allItems = document.querySelectorAll('#genre-list li');
                for (let item of allItems) {
                    item.classList.remove('active-genre');
                }
                alert("❌ Всі фільтри успішно скинуто."); 
            }
        }
        
        const menuHandler = new MenuMethods();
        
        movieMenu.onclick = function(event) {
            let action = event.target.dataset.action;
            if (action) {
                menuHandler[action]();
            }
        };
    }
});

//
// 3. Патерн проєктування «Поведінка» (data-behavior)
// 
document.addEventListener("click", function(event) {
    let behavior = event.target.dataset.behavior;
    
    if (behavior === "copy-title") {
        let movieTitle = event.target.dataset.title;
        
        navigator.clipboard.writeText(movieTitle).then(() => {
            let originalText = event.target.innerText;
            let originalBg = event.target.style.backgroundColor;
            
            event.target.innerText = "✅ Скопійовано!";
            event.target.style.backgroundColor = "#27ae60";
            
            setTimeout(() => {
                event.target.innerText = originalText;
                event.target.style.backgroundColor = originalBg;
            }, 1500);
        });
    }
});