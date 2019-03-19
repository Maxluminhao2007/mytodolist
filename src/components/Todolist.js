import React, { Component } from 'react';
import '../assets/css/Todolist.css'
class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[
            ]
        };
    }
    handleInput = (e) => {
        if(e.keyCode === 13) {
            // console.log(e.target.value)
            if(e.target.value === '') {
                alert('请输入需要添加的事件');
                return ;
            }
            
            let tmpList = this.state.list;
            tmpList.push({
                title: e.target.value,
                flag: false
            })
            this.setState({
            list: tmpList
            })
            e.target.value = '';

            localStorage.setItem('todolist', JSON.stringify(tmpList));
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

        localStorage.setItem('todolist', JSON.stringify(tmpList));
    }
    handleClear = () => {
        this.setState({
            list: []
        })

        localStorage.setItem('todolist', JSON.stringify([]));
    }
    handleRemove = (key) => {
        let tmpList = this.state.list;
        tmpList.splice(key, 1);
        this.setState({
            list: tmpList
        })

        localStorage.setItem('todolist', JSON.stringify(tmpList));
    }
    //待添加
    handleThingsChange = (key) => {
        console.log(key);
    }
    toAddInput=()=> {
        this.refs.addEvent.focus();
    }
    componentDidMount = () =>{
        let tmpList = JSON.parse(localStorage.getItem('todolist'));
        this.setState({
            list: tmpList
        })
    }
    render() {
        return (
            <div>
                <header>
                    <div>
                        <label onClick={this.toAddInput}>ToDoList:</label>
                        <input type='text' ref='addEvent' onKeyUp={this.handleInput} placeholder='添加Todo' />
                    </div>

                </header>
                <div className='subDiv'>
                    <p><b className='subTitle'>正在进行</b><span className='count'>{this.countNumber('1')}</span></p>
                    <ul className='doingList'>
                        {
                            this.state.list.map((value, key) => {
                                if(value.flag === false) {
                                    return(
                                        <li key={key} draggable='true'>
                                        <input type='checkbox' onChange={this.handleCheckBoxChange.bind(this, key)} checked={value.flag} />
                                        <span onClick={this.handleThingsChange.bind(this, key)}>{value.title}</span>
                                        <button onClick={this.handleRemove.bind(this, key)}></button>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                    <p><b className='subTitle'>已经完成</b><span className='count'>{this.countNumber('2')}</span></p>
                    <ul className='doingList'>
                        {
                            this.state.list.map((value, key) => {
                                if(value.flag === true) {
                                    return(
                                        <li key={key} draggable='true' className='nextLi'>
                                        <input type='checkbox' onChange={this.handleCheckBoxChange.bind(this, key)} checked={value.flag}/>
                                        <span onClick={this.handleThingsChange.bind(this, key)}>{value.title}</span>
                                        <button onClick={this.handleRemove.bind(this, key)}></button>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
                <footer>Copyright 2019 Minhao <span onClick={this.handleClear}>clear</span></footer>
            </div>
        );
    }
}

export default Todolist;