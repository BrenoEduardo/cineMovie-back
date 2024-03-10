const mongoose = require('mongoose')
const fs = require('fs');
const Movie = require('../model/Movies')

const a = [
    {
	  "name": "Riddick",
	  "description": "Left for dead on a sun-scorched planet, Riddick finds himself up against an alien race of predators. Activating an emergency beacon alerts two ships: one carrying a new breed of mercenary, the other captained by a man from Riddick's past.",
	  "duration": 119,
	  "ratings": 6.8,
	  "releaseYear": 2013,
	  "genres": [
	  	  "Action",
		  "Sci-Fi",
		  "Thriller"
      ],
	  "directors": [ "David Twohy" ],
	  "coverImage": "gs://graoa-direto.appspot.com/movies/acredito.jpghttps://firebasestorage.googleapis.com/v0/b/graoa-direto.appspot.com/o/movies%2Facredito.jpg?alt=media&token=af59eb35-f4c2-443b-a49f-80e31c66c795",
	  "actors": [
	  	  "Vin Diesel",
		  "Karl Urban",
		  "Katee Sackhoff"
	  ],
	},
    {
      "releaseYear": 2013,
      "name": "We're the Millers",
      "directors": [ "Rawson Marshall Thurber" ],
      "ratings": 7.2,
      "genres": [
        "Comedy",
        "Crime"
      ],
      "coverImage": "https://firebasestorage.googleapis.com/v0/b/graoa-direto.appspot.com/o/movies%2Fchoice.jpg?alt=media&token=404f9a2c-aa3c-4107-8811-4f28eaa92122",
      "description": "A veteran pot dealer creates a fake family as part of his plan to move a huge shipment of weed into the U.S. from Mexico.",
      "duration": 110,
      "actors": [
        "Jason Sudeikis",
        "Jennifer Aniston",
        "Emma Roberts"
      ],
    },
    {
      "releaseYear": 2014,
      "name": "Divergent",
      "directors": [ "Neil Burger" ],
	  "ratings": 6.4,
	  "genres": [
		"Action",
		"Adventure",
		"Romance",
		"Sci-Fi"
      ],
	  "coverImage": "https://firebasestorage.googleapis.com/v0/b/graoa-direto.appspot.com/o/movies%2Fdsa.jpg?alt=media&token=19ab6de5-c06b-4685-9dc6-bd86e1783907",
	  "description": "Beatrice Prior, a teenager with a special mind, finds her life threatened when an authoritarian leader seeks to exterminate her kind in her effort to seize control of their divided society.",
	  "duration": 117,
	  "actors": [
		"Shailene Woodley",
		"Kate Winslet",
		"Zoe Kravitz"
	  ],
    },
    {
      "releaseYear": 2013,
      "name": "Elysium",
      "directors": [ "Neill Blomkamp" ],
      "releaseDate": "2013-08-07T00:00:00Z",
      "ratings": 7,
	  "totalRating": 436,
      "genres": [
        "Action",
        "Drama",
        "Sci-Fi",
        "Thriller"
      ],
      "coverImage": "Elysium-2013.jpg",
      "description": "Set in the year 2154, where the very wealthy live on a man-made space station while the rest of the population resides on a ruined Earth, a man takes on a mission that could bring equality to the polarized worlds.",
      "duration": 109,
      "actors": [
        "Matt Damon",
        "Jodie Foster",
        "Sharlto Copley"
      ],
      "price": 65
    },
    {
      "releaseYear": 2014,
      "name": "RoboCop",
      "directors": [ "Jose Padilha" ],
      "releaseDate": "2014-01-30T00:00:00Z",
	  "ratings": 7.7,
	  "totalRating": 310,
      "genres": [
        "Action",
        "Crime",
        "Sci-Fi",
        "Thriller"
      ],
      "coverImage": "RoboCop-2014.jpg",
      "description": "In 2028 Detroit, when Alex Murphy (Joel Kinnaman) - a loving husband, father and good cop - is critically injured in the line of duty, the multinational conglomerate OmniCorp sees their chance for a part-man, part-robot police officer.",
      "duration": 110,
      "actors": [
        "Joel Kinnaman",
        "Douglas Urbanski",
        "Abbie Cornish"
      ],
      "price": 40
    },
    {
      "releaseYear": 2014,
      "name": "Captain America: The Winter Soldier",
      "directors": [
        "Anthony Russo",
        "Joe Russo"
      ],
      "releaseDate": "2014-04-02T00:00:00Z",
	  "ratings": 7.9,
	  "totalRating": 239,
      "genres": [
        "Action",
        "Adventure",
        "Sci-Fi"
      ],
      "coverImage": "captain-america-the-winter-soldier-2014.jpg",
      "description": "Steve Rogers struggles to embrace his role in the modern world and teams up with Natasha Romanoff, aka Black Widow, to battle a powerful yet shadowy enemy in present-day Washington, D.C.",
      "duration": 135,
      "actors": [
        "Chris Evans",
        "Frank Grillo",
        "Sebastian Stan"
      ],
      "price": 57
    },
    {
      "releaseYear": 2013,
      "name": "Behind the Candelabra",
      "directors": [ "Steven Soderbergh" ],
      "releaseDate": "2013-05-21T00:00:00Z",
      "ratings": 7,
	  "totalRating": 325,
      "genres": [
        "Biography",
        "Drama",
        "Romance"
      ],
      "coverImage": "behind-the-candelabra-2013.jpg",
      "description": "Based on the autobiographical novel, the tempestuous 6-year relationship between Liberace and his (much younger) lover, Scott Thorson, is recounted.",
      "duration": 118,
      "actors": [
        "Matt Damon",
        "Scott Bakula",
        "Eric Zuckerman"
      ],
      "price": 59
    },
    {
      "releaseYear": 2012,
      "name": "The Dark Knight Rises",
      "directors": [ "Christopher Nolan" ],
      "releaseDate": "2012-07-16T00:00:00Z",
      "ratings": 8.6,
	  "totalRating": 530,
      "genres": [
        "Action",
        "Crime",
        "Thriller"
      ],
      "coverImage": "the-dark-knight-rises-2012.jpg",
      "description": "Eight years on, a new evil rises from where the Batman and Commissioner Gordon tried to bury it, causing the Batman to resurface and fight to protect Gotham City... the very city which brands him an enemy.",
      "duration": 165,
      "actors": [
        "Christian Bale",
        "Tom Hardy",
        "Anne Hathaway"
      ],
      "price": 57
    }
  ]

mongoose.connect('mongodb+srv://brenoeduardocostamoreira:LnKYwYU8jzzPI8a5@cluster0.ngfnghv.mongodb.net/?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

// read movies 
const movies = JSON.parse(fs.readFileSync(a, 'utf-8'))

const deleteMovies = async ()=>{
    try {
        await Movie.deleteMany();
        console.log('Everythink all rigth')
    } catch (error) {
        
    }
}

const importMovies = async ()=>{
    try {
        await Movie.create(movies);
        console.log('Everythink all rigth')
    } catch (error) {
        
    }
}

console.log(process.argv)
