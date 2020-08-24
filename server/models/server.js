const mongoose = require('mongoose');

var serverSchema = mongoose.Schema({
    exams: {
        type: Number,
        default: 0,
    },
    questions: {
        type: Number,
        default: 0,
    },
    messages: {
        type: Number,
        default: 0,
    },
    hours: {
        type: Number,
        default: 0,
    },
    animals: {
        type: [{
            name: {
                type: String
            },
            color: {
                type: String
            },
            reference: {
                type: String
            }
        }],
        _id: false
    }
});

serverSchema.methods.setDefaultAnimals = function setDefaultAnimals(){
    return new Promise((resolve, reject) => {
        this.animals = defaultAnimals;
        this.save()
        .then(obj => resolve(obj))
        .catch(error => reject(error));
    });
}

var Server = mongoose.model('Server', serverSchema);

module.exports = Server;

var defaultAnimals = [
    {
        name: 'Aardvark',
        color: 'Aquamarine',
    },
    {
        name: 'Alligator',
        color: 'Bisque',
    },
    {
        name: 'Alpaca',
        color: 'Blue',
    },
    {
        name: 'Antelope',
        color: 'BlueViolet',
    },
    {
        name: 'Armadillo',
        color: 'Brown',
    },
    {
        name: 'Donkey',
        color: 'BurlyWood',
    },
    {
        name: 'Baboon',
        color: 'Chocolate',
    },
    {
        name: 'Badger',
        color: 'Coral',
    },
    {
        name: 'Beaver',
        color: 'Crimson',
    },
    {
        name: 'Bison',
        color: 'DarkBlue',
    },
    {
        name: 'Cat',
        color: 'DarkCyan',
    },
    {
        name: 'Caterpillar',
        color: 'DarkGreen',
    },
    {
        name: 'Cheetah',
        color: 'DarkMagenta',
    },
    {
        name: 'Crow',
        color: 'DarkOliveGreen',
    },
    {
        name: 'Deer',
        color: 'DarkOrchid',
    },
    {
        name: 'Dog',
        color: 'DarkRed',
    },
    {
        name: 'Dolphin',
        color: 'DarkSlateBlue',
    },
    {
        name: 'Duck',
        color: 'DarkSlateGray',
    },
    {
        name: 'Eagle',
        color: 'DarkViolet'
    }
]

//  let animals = [
//     "Aardvark", "Albatross", "Alligator", "Alpaca", "Ant", "Anteater", "Antelope", "Ape", "Armadillo", "Donkey", "Baboon", "Badger", "Barracuda", "Bat", "Bear", "Beaver",
//     "Bee", "Bison", "Boar", "Buffalo", "Butterfly", "Camel", "Capybara", "Caribou", "Cassowary", "Cat", "Caterpillar", "Cattle", "Chamois", "Cheetah", "Chicken", "Chimpanzee", "Chinchilla", "Chough",
//     "Clam", "Cobra", "Cockroach", "Cod", "Cormorant", "Coyote", "Crab", "Crane", "Crocodile", "Crow", "Curlew", "Deer", "Dinosaur", "Dog", "Dogfish", "Dolphin", "Dotterel", "Dove", "Dragonfly",
//     "Duck", "Dugong", "Dunlin", "Eagle", "Echidna", "Eel", "Eland", "Elephant", "Elk", "Emu", "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Fly", "Fox", "Frog", "Gaur", "Gazelle", "Gerbil",
//     "Giraffe", "Gnat", "Gnu", "Goat", "Goldfinch", "Goldfish", "Goose", "Gorilla", "Goshawk", "Grasshopper", "Grouse", "Guanaco", "Gull", "Hamster", "Hare", "Hawk", "Hedgehog", "Heron", "Herring",
//     "Hippopotamus", "Hornet", "Horse", "Human", "Hummingbird", "Hyena", "Ibex", "Ibis", "Jackal", "Jaguar", "Jay", "Jellyfish", "Kangaroo", "Kingfisher", "Koala", "Kookabura", "Kouprey", "Kudu",
//     "Lapwing", "Lark", "Lemur", "Leopard", "Lion", "Llama", "Lobster", "Locust", "Loris", "Louse", "Lyrebird", "Magpie", "Mallard", "Manatee", "Mandrill", "Mantis", "Marten", "Meerkat", "Mink",
//     "Mole", "Mongoose", "Monkey", "Moose", "Mosquito", "Mouse", "Mule", "Narwhal", "Newt", "Nightingale", "Octopus", "Okapi", "Opossum", "Oryx", "Ostrich", "Otter", "Owl", "Oyster", "Panther", "Parrot",
//     "Partridge", "Peafowl", "Pelican", "Penguin", "Pheasant", "Pig", "Pigeon", "Pony", "Porcupine", "Porpoise", "Quail", "Quelea", "Quetzal", "Rabbit", "Raccoon", "Rail", "Ram", "Rat", "Raven",
//     "Red deer", "Red panda", "Reindeer", "Rhinoceros", "Rook", "Salamander", "Salmon", "Sand Dollar", "Sandpiper", "Sardine", "Scorpion", "Seahorse", "Seal", "Shark", "Sheep", "Shrew", "Skunk",
//     "Snail", "Snake", "Sparrow", "Spider", "Spoonbill", "Squid", "Squirrel", "Starling", "Stingray", "Stinkbug", "Stork", "Swallow", "Swan", "Tapir", "Tarsier", "Termite", "Tiger", "Toad", "Trout",
//     "Turkey", "Turtle", "Viper", "Vulture", "Wallaby", "Walrus", "Wasp", "Weasel", "Whale", "Wildcat", "Wolverine", "Wombat", "Woodcock", "Woodpecker", "Worm", "Wren", "Yak", "Zebra"
// ]