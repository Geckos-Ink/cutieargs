
function cutDash(to){
    let l=0;
    if(!to) return to;
    while(l < to.length && to[l]=='-')
        l++;

    return to.substr(l);
}

class Args {
    constructor (){
        this.descriptions = [];

        this.arr = this.Values  = [];
        this.obj = this.Keys    = {};

        let argv = process.argv;
        let n = 0;

        while(n < argv.length){
            let v = argv[n++];
            switch(n){
                case 0:
                    this.node = v;
                    break;

                case 1:
                    this.script = v;
                    break;

                default:
                    if(v.startsWith('-')){
                        let name = v.substr(2+v.indexOf('--'));
                        this.obj[name] = argv[n++];

                        if(this[name]===undefined)
                            this[name] = this.obj[name];
                    }
                    else {
                        this[this.arr.length] = v;
                        this.arr.push(v);
                    }

                    break;
            }
        }
    }
    
    describe(description){
        if(!Array.isArray(description))
            return console.error('Wrong Args type description (excepted array)');

        for(var d in description){
            let descr = description[d];
            if(Array.isArray(descr)){
                let spl = descr[0].split(' ');
                let isShort = (descr[1]??'').startsWith('-');
                descr = {
                    cmd: spl[0],
                    short: spl[1] ?? isShort ? descr[1] : null,
                    usage: descr[2] ?? !isShort ? descr[1] : null
                }
            }

            let v;
            if(v = this.obj[cutDash(descr.short)])
                this.obj[cutDash(descr.cmd)] = v;

            this.descriptions.push(descr);            
        }
    }
}

module.exports = new Args();