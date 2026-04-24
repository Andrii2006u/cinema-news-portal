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