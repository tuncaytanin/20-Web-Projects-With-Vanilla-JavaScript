const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
let movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

// Save Selected index and  price
function setMovieData(movieIndex, moveiPrice){
localStorage.setItem('selectedMovieIndex',movieIndex);
localStorage.setItem('selectedMoviePrice',moveiPrice);
}

// update total and Count
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  
  const seatIndex = [...selectedSeats].map(function(seat){
    return [...seats].indexOf(seat);
  });

  localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount *  ticketPrice;
}

//Get data from localStorage and populate UI
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selectedSeats);
  if(selectedSeats !== null && selectedSeats.length>0){
    seats.forEach((seat,index) => {
      if(selectedSeats.indexOf(index)>-1){
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
  if(selectedMoviePrice !== null){
    movieSelect.value = selectedMoviePrice;
  }

}

//Movie select Event
movieSelect.addEventListener('change', e=>{
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex,e.target.value);
  updateSelectedCount();
});

// Seat clik event
container.addEventListener('click', e => {

  if(e.target.classList.contains('seat') && ! e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});


// initial count and total set
updateSelectedCount();