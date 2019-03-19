import React, { Component } from 'react';
import '../assets/css/Todolist.css'
class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[
                {
                    title: '完成自己的todolist初步编写',
                    flag: false
                },
                {
                    title: '完成自己的todolist样式改编',
                    flag: true
                },
                {
                    title: '吃饭',
                    flag: true
                }
            ]
          };
    }
    handleInput = (e) => {
        if(e.keyCode === 13) {
            // console.log(e.target.value)
            let tmpList = this.state.list;
            tmpList.push({
                title: e.target.value,
                flag: false
            })
            this.setState({
            list: tmpList
            })
            e.target.value = '';
        }

    }
    countNumber = (mark) => {
        let count = 0;
        if(mark === '1') {
            this.state.list.map((value) => {
                if(value.flag === false) {
                    count++;
                }
                return;
            })
            return count;
        }else {
            this.state.list.map((value) => {
                if(value.flag === true) {
                    count++;
                }
                return;
            })
            return count;
        }
    }
    handleCheckBoxChange = (key) => {
        let tmpList = this.state.list;
        tmpList[key].flag = !tmpList[key].flag;
        this.setState({
            list: tmpList
        })
    }
    handleClear = () => {
        this.setState({
            list: []
        })
    }
    render() {
        return (
            <div>
                <header>
                    ToDoList: <input type='text' className='' onKeyUp={this.handleInput} placeholder='添加Todo' />
                </header>
                <div>
                    <p><b className='subTitle'>正在进行</b>{this.countNumber('1')}</p>
                    <ul className='doingList'>
                        {
                            this.state.list.map((value, key) => {
                                if(value.flag === false) {
                                    return(
                                        <li key={key}><input type='checkbox' onChange={this.handleCheckBoxChange.bind(this, key)} checked={value.flag} />{value.title}</li>
                                    )
                                }
                            })
                        }
                    </ul>
                    <p><b className='subTitle'>已经完成</b>{this.countNumber('2')}</p>
                    <ul className='doingList'>
                        {
                            this.state.list.map((value, key) => {
                                if(value.flag === true) {
                                    return(
                                        <li key={key}><input type='checkbox' onChange={this.handleCheckBoxChange.bind(this, key)} checked={value.flag}/>{value.title}</li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
                <footer>Copyright 2019 Minhao <div onClick={this.handleClear}>clear</div></footer>
            </div>
        );
    }
}

export default Todolist;