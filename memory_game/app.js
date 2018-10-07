const memoryGame = {
    tilesNumbers : 42, //liczba wszystkich kafelków
    tilesInRow : 7, //liczba kafelków w jednym wierszu
    gameArea : null, //div z planszą gry
    scoreArea : null, //div z wynikiem gry
    numbersOfMoves : 0, //liczba ruchów
    tilesMix : [], //tutaj trafi wymieszana tablica klocków
    tilesChecked : [], //zaznaczone klocki
    canClick : true, // można klikać na kafelki
    tilesInPairs : 0, //liczba dopasowanych kafelkow
    tilesImage : [
        'images/1.png',
        'images/2.png',
        'images/3.png',
        'images/4.png',
        'images/5.png',
        'images/6.png',
        'images/7.png',
        'images/8.png',
        'images/9.png',
        'images/10.png',
        'images/11.png',
        'images/12.png',
        'images/13.png',
        'images/14.png',
        'images/15.png',
        'images/16.png',
        'images/17.png',
        'images/18.png',
        'images/19.png',
        'images/20.png',
        'images/21.png'
    ],


    startGame : function() {
        //czyszczenie planszy gry
        this.gameArea = document.querySelector('#game_area');
        this.gameArea.innerHTML = '';

        //czyszczenie zliczania ilosci ruchów
        this.scoreArea = document.querySelector('#game_score');
        this.scoreArea.innerHTML = '';

        //czyszczenie żeby można zacząć grę od nowa
        this.tilesMix = [];
        this.tilesChecked = [];
        this.numbersOfMoves = 0;
        this.canClick = true;
        this.tilesInPairs = 0;

        //generowanie tablicy numerów kafelków (każdego po2)
        for (var i = 0; i <this.tilesNumbers; i++) {
            this.tilesMix.push(Math.floor(i/2));
        }

        //MIESZANIE TABLICY KAFELKÓW
        for (var i = this.tilesNumbers-1; i > 0; i--) {
            const swap = Math.floor(Math.random()*i);
            const tmp = this.tilesMix[i];
            this.tilesMix[i] = this.tilesMix[swap];
            this.tilesMix[swap] = tmp;
        }

        for (var i = 0; i < this.tilesNumbers; i++) {
            const tile = document.createElement('div');
            tile.classList.add("game-tile");
            this.gameArea.appendChild(tile);
            //w atrybucie dataset przypisanie numerów, które będą porównywane czy są takie same
            tile.dataset.number = this.tilesMix[i];
            tile.dataset.index = i;

            tile.style.left = 6 + (tile.offsetWidth+6) * (i%this.tilesInRow) + 'px';
            tile.style.top = 6 + (tile.offsetHeight+6) * (Math.floor(i/this.tilesInRow)) + 'px';

            //uruchomienie funcji tileClick po  kliknięciu w kafelek//bind tworzy funkcję powiązaną, która ma tę samą treść, co funkcja pierwotna -  this nie wskazuje już na kliknięty kafelek, a na cały obiekt.
            tile.addEventListener('click', this.tileClick.bind(this));
        }
    },


    tileClick : function(event) {
        if (this.canClick) {
            //jeżeli jeszcze nie został wybrany żaden kafelek lub jeżeli index tego kafelka nie istnieje w wybranych
            if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== event.target.dataset.index)) {
                this.tilesChecked.push(event.target);
                event.target.style.backgroundImage = 'url(' + this.tilesImage[event.target.dataset.number] + ')';
            }

            //zablokowanie ponownego kliknięcia w kafelek
            if (this.tilesChecked.length === 2) {
                this.canClick = false;

                if (this.tilesChecked[0].dataset.number === this.tilesChecked[1].dataset.number) {
                    setTimeout(this.deleteTiles.bind(this), 1000);
                } else {
                    setTimeout(this.resetTiles.bind(this), 1000);
                }
                //zliczanie ruchów
                this.numbersOfMoves++;
                this.scoreArea.innerText = this.numbersOfMoves;
            }
        }
    },

    deleteTiles : function() {
        this.tilesChecked[0].remove();
        this.tilesChecked[1].remove();

        //po usunięciu pary kafelków przywrócenie możliwości kliknięcia i wyczyszczenie tablicy wybranych
        this.canClick = true;
        this.tilesChecked = [];

        this.tilesInPairs++;
        if (this.tilesInPairs >= this.tilesNumbers / 2) {
            const winner = document.createElement('div');
            winner.classList.add("game_winner");
            winner.innerHTML = "Jesteś zwycięzcą!";
            this.gameArea.appendChild(winner);
        }
    },

    resetTiles : function() {
        this.tilesChecked[0].style.backgroundImage = 'url(images/znak_zapytania.jpg)';
        this.tilesChecked[1].style.backgroundImage = 'url(images/znak_zapytania.jpg)';

        this.canClick = true;
        this.tilesChecked = [];
    }

};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.game_start').addEventListener('click', function() {
        memoryGame.startGame();
    });
});


console.log(memoryGame);