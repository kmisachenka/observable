# Simple Observable Implementation

_Only for learning purpose_

## Usage

```
Observable.range(10, 1)
    .map(number => number * 100)
    .forEach(number => console.log(number));

1000
900
800
700
600
500
400
300
200
100
```

```
Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .skip(3)
    .take(4)
    .filter(number => number % 2 == 0)
    .map(number => number * 10)
    .subscribe(
        prop => console.log(prop),
        (err) => {},
        () => console.log("Done!"));
    
40
60
Done!
```


```
Observable.from('Observable')
    .take(5)
    .skip(2)
    .map(letter => letter.toUpperCase())
    .subscribe(
        letter => console.log('Next: ' + letter),
        err => console.log('Error: ' + err),
        () => console.log('Done!'));
        
Next: S
Next: E
Next: R
Done!
```