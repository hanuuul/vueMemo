const { createApp } = Vue

createApp({
    data() {
        return {
            mode: 'list',
            memo: {
                id: null,
                content: null,
                regDate: null
            },
            memos: []
        }
    },
    methods: {
        renew(val){
            //객체는 참조값으로 넘어가기 때문에 값만 들어가도록
            //string형태로 바꾸고 다시 json으로 parse
            return JSON.parse(JSON.stringify(val));
        },
        open(id){
            for(let i in this.memos){
                if(this.memos[i].id === id){
                    //객체일 때 = 는 참조 값도 넣어줌
                    //값으로만 넣어줘야 문제가 없음 (renew작업)
                    this.memo = this.renew(this.memos[i]);
                    break;
                }
            }
            this.mode = 'edit';
        },
        write(){
            this.mode = 'write';
            this.memo = {
                id: null,
                content: null,
                regDate: null
            };
        },
        save(){
            const id = this.memos.length + 1;
            
            /* 새로 작성 */
            if(this.mode === 'write'){
                this.memos.push({
                    id: id,
                    content: this.memo.content,
                    regDate: new Date()
                });
            }
            else if(this.mode === 'edit'){
                for(let i in this.memos){
                    if(this.memos[i].id === this.memo.id){
                        this.memos[i] = this.renew(this.memo);
                        break;
                    }
                }
            }
            this.mode = 'list';

            /* 로컬스토리지에 저장 */
            localStorage.setItem('memos', JSON.stringify(this.memos))
            //저장된 내용은 개발자도구 > 애플리케이션 > 로컬스토리지 > 해당내용 오른쪽클릭 삭제 누르면 됨
        },
        remove(){
            if(confirm('삭제하시겠습니까?')){
                for(let i in this.memos){
                    if(this.memos[i].id === this.memo.id){
                        //i라는 인덱스를 가진 memos 삭제
                        this.memos.splice(i, 1);
                        break;
                    }
                }
                localStorage.setItem('memos', JSON.stringify(this.memos))
                this.mode = 'list';
            }
            
        }
    },
    /* 실행됐을 때 내용을 memos에 넣기 */
    created(){
        const memos = localStorage.getItem('memos');
        if(memos){ //memos에 내용이 있다면
            this.memos = JSON.parse(memos);
        }
    }

}).mount('#app')