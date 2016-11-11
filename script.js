class Observable {

    constructor(source) {
        this.source = source;
        this.result = this.source;
    }

    static from(source) {
        if (Array.isArray(source)) {
            return new Observable(source);
        }

        if (typeof source === 'string') {
            return new Observable(source.split(''));
        }

        throw new Error('Incompatible type of source: ' + source);
    }

    static range(begin, end) {
        let array = [];
        if (begin < end) {
            for (let i = begin; i <= end; i++) {
                array.push(i);
            }
        } else if (begin > end) {
            for (let i = begin; i >= end; i--) {
                array.push(i);
            }
        } else {
            throw new Error('begin and end numbers mustn\'t be equals')
        }
        return new Observable(array);
    }

    subscribe(onNext, onError, onCompleted) {
        if (typeof onNext !== 'function') {
            throw new Error('onNext must be a function');
        }

        try {
            for (let item of this.result) {
                onNext(item);
            }
            if (onCompleted) {
                onCompleted();
            }
        } catch (err) {
            if (onError) {
                onError(err);
            }
        }

    }

    forEach(fn) {
        this.subscribe(fn);
    }


    filter(predicate) {
        this.result = this.result.filter(predicate);
        return this;
    }

    map(selector) {
        this.result = this.result.map(selector);
        return this;
    }

    take(count) {
        this.result = this.result.slice(0, count);
        return this;
    }

    skip(count) {
        this.result = this.result.slice(count, this.result.length);
        return this;
    }

}

Observable.range(10, 1)
    .map(number => number * 100)
    .forEach(number => console.log(number));


Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .skip(3)
    .take(4)
    .filter(number => number % 2 == 0)
    .map(number => number * 10)
    .subscribe(prop => console.log(prop));


Observable.from('Observable')
    .take(5)
    .skip(2)
    .map(letter => letter.toUpperCase())
    .filter(letter => letter === 'E')
    .subscribe(
        letter => console.log('Next: ' + letter),
        err => console.log('Error: ' + err),
        () => console.log('done!'));
