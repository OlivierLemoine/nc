class Bonjour {

    let voiture: i32 = 0;

    function __def () -> Bonjour {

    }
}

let i = {
    a = 10, // i32
    b = 'test', // str
};

let j : Bonjour = new Bonjour();

let k = 10;

function blabla (a: {a: i32, b: str}, b: Bonjour) -> void {
    let arf = 'oui';
    print(a.a);
}

k = k + 15;

k = function () -> u8 {
    return 0xA;
}

blabla(i, j);

j = k();