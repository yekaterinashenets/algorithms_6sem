'use strict';
class Salesman {
    constructor(n) {
        this.N      = n;                               // число вершин
        this.minWay = new Array(this.N);               // лучший путь (массив номеров вершин)
        this.minLen = Infinity;                        // лучшее расстояние

        this.dists = new Array(this.N);                // двумерная матрица расстояний
        for(let j=0; j < this.N; j++)
            this.dists[j] = new Array(this.N);

        this.pos = new Array(this.N);              
        this.way = new Array(this.N);
        this.loops   = 1000;
    }

    copy(des, src) {
       if(des.length !== src.length)                 
          des = new Array(src.length);                
       for(let i=0; i < src.length; i++)             
          des[i] = src[i];
       return des;                                
    }

    swap(ar, i, j) {
        let a = ar[i]; ar[i]=ar[j]; ar[j]=a;
    }

    factorial(n) {
       if(n < 2) return 1;
       return n*this.factorial(n-1);             
    }

    nextPermutation (ar, lf) {
       var  rt=ar.length-1, i=rt-1;
       while( i >= lf && ar[i] >= ar[i+1]) i--;  
       if(i < lf)                                    
          return false;                              
    
       var j = rt;                                  
       while(ar[i] >= ar[j]) j--;                    
       this.swap(ar, i, j);                         
    
       let left = i+1;                               
       while(left < rt)
          this.swap(ar, left++, rt--);
       return true;                            
    }

    create() {
        for(let k=0; k < this.N; k++)
            this.pos[k] = {x:this.rand(1000),y:this.rand(1000)};  // случайное положение вершин

        this.setDistances();
    }

    setDistances() {
        for(let j=0; j < this.N; j++){                
            this.dists[j][j] = -1;                      
            for(let i=0; i < j; i++){
               let dx = this.pos[i].x - this.pos[j].x;
               let dy = this.pos[i].y - this.pos[j].y; 
               let d  = Math.sqrt(dx*dx+dy*dy);
               this.dists[j][i] = this.dists[i][j] = d;
            }
         }
      
         for(let i=0; i < this.N; i++)
            this.minWay[i] = this.way[i] = i;        
         this.minLen = this.distance(this.minWay);
    }

    distance(way) {
        let d = 0, i = 1;
        if (way.length) {
            for(; i < way.length; i++)
                d += this.dists[way[i-1]][way[i]];        
            return d + this.dists[way[i-1]][way[0]];     
        }
    }

    run(method) {
        if(this.timerID === undefined){               
            this.timerID = setInterval(this.timer.bind(this), 1);
            this.method = method;
            this.init();                             
            this.timer();                            
         }
         else
            this.stop();                              
    }

    stop() {
        this.timerID = clearInterval(this.timerID);
    }

    init() {
        this.cntWays  = 0;                             // число итераций

        if(this.minWay.length !== this.N){            
            this.minWay   = new Array(this.N);         
            this.way      = new Array(this.N);        
            for(let i=0; i < this.N; i++)              
                this.minWay[i] = this.way[i] = i;       
            this.minLen = this.distance(this.minWay);
        }
        this.maxLen  = 0;                             
        
        switch(this.method){                          
            case "brute-force":
                this.bruteForceInit();
                break;    // полный перебор
            case "greedy":
                this.greedyInit();
                break;    // жадный алгоритм
        }
    }

    timer() {
        switch(this.method){
            case "brute-force":
                this.bruteForceTimer();
                break;  
            case "greedy":
                this.greedyTimer();
                break; 
         }
    }

    outInfo() {
        this.setValueInTable(this.method, 'name', this.method);
        this.setValueInTable(this.method, 'iterations', this.cntWays);
        this.setValueInTable(this.method, 'path', this.minWay);
        this.setValueInTable(this.method, 'length', this.minLen);
    }

    bruteForceInit() {
        this.total = this.factorial(this.N-1); 
        for(let i=0; i < this.N; i++) this.way[i] = i;
    }

    bruteForceTimer() {
        var num = this.loops;                        
        do{
           this.cntWays++;                            
           let len = this.distance(this.way);         
           if(len < this.minLen){                    
              this.minLen = len;                      
              this.minWay = this.copy(this.minWay, this.way);
           }
           if(len > this.maxLen) this.maxLen=len;    
        } while(this.nextPermutation(this.way, 1) && --num);
         if(num)    {
             this.stop(); 
         }                      
         this.outInfo();
    }

    greedyInit() {
        this.greedyJ = this.last = 0; this.left = 1; 
        for(var i=0; i < this.N; i++ ) 
           this.minWay[i] = this.way[i] = i;
        this.minLen = this.distance(this.way);
    }

    greedyTimer() {
        let num = this.loops;                 
        do{      
            this.cntWays++;
           if(this.left < this.N){                  
              let min = this.dists[this.last][this.way[this.left]];
              for(let i=this.left+1; i < this.N; i++)  
                 if(this.dists[this.last][this.way[i]] < min){
                    min = this.dists[this.last][this.way[i]];
                    this.swap(this.way,this.left,i);
                 }
              this.greedyD += min;                 
              this.last = this.way[this.left++];      
           }
           else{
              this.greedyD += this.dists[this.last][this.greedyJ];           
              if(this.minLen > this.greedyD){ 
                 this.minLen = this.greedyD;   
                 this.minWay = this.copy(this.minWay, this.way);
              }
              if( ++this.greedyJ >= this.N ){         
                 this.stop();                         
                 break;                       
              }
              for(let i=0; i < this.N; i++ )       
                 this.way[i] = i;                 
              this.swap(this.way, 0, this.greedyJ); 
              this.last = this.greedyJ;      
              this.left = 1; this.greedyD = 0;                         
           }     
        } while(--num);
         this.outInfo();
    }

    rand(n) {
        return Math.floor(Math.random()*n);
    }

    setValueInTable(id, key, value) {
        document.getElementById(`${id}__${key}`).innerHTML = value;
    }
}