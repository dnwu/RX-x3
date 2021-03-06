import React, { Component } from 'react';
import { DatePicker, Pagination, Input, Button, Icon, Popover, message } from 'antd'
// 点击放大图片插件
import Zmage from 'react-zmage'
import tool from './../../tools'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './index.scss'
import api from '../../config/api.js';

const { RangePicker } = DatePicker;


class passLog extends Component {
    state = {
        currentPage: 1,  //当前页码
        pageSize: 6,   // 每页显示的数量
        totalNum: 0,   // 列表总数量
        beg: 0,
        end: 0,
        ch: "",
    }
    componentDidMount() {
        this.list(this.state.pageSize, 1)
    }
    inputChange = (e) => {
        this.setState({
            ch: e.target.value
        })
    }
    timeChange = (value) => {
        console.log(value);
        if (!value.length) {
            this.setState({
                beg: 0,
                end: 0
            })
            return
        }
        let data0 = new Date(value[0]._d)
        let data1 = new Date(value[1]._d)
        let beg = parseInt(data0.getTime() / 1000, 10)
        let end = parseInt(data1.getTime() / 1000, 10)
        this.setState({
            beg,
            end
        })
    }
    search = async () => {
        // console.log('search');
        this.list(this.state.pageSize, 1, this.state.ch, this.state.beg, this.state.end)
    }
    download =async () => {
        let options = {
            "beg": this.state.beg,
            "end": this.state.end,
            "ch": this.state.ch,
            "db": "",
            "face": "",
            "hit": 1,
            "limit": 10000000000000,
            "offset": 0
        }
        let { data } = await api.download(options)
        let downloadUrl = data.Url
        this.downloadFile(downloadUrl)
    }
    downloadFile = (url) => {
        var formDOM = document.createElement('form')
        formDOM.style = 'display:none'
        formDOM.target = ""
        formDOM.method = "get"
        formDOM.action = url
        document.body.appendChild(formDOM)
        formDOM.submit()
        document.body.removeChild(formDOM)
    }


    pageChange = (page) => {
        this.list(this.state.pageSize, page, this.state.ch, this.state.beg, this.state.end)
        this.setState({
            currentPage: page
        })
    }
    infoModel = (info = { db: '****', face: '*****' }) => {
        let spanStyle = {
            width: '40px',
            display: 'inline-block',
            textAlignLast: 'justify',
            marginRight: '10px'
        }
        let wordStyle = {
            fontWeight: '700'
        }
        return (
            <div>
                <div><span style={spanStyle}>来源:</span><span style={wordStyle}>{info.db}</span></div>
                <div><span style={spanStyle}>id :</span><span style={wordStyle}>{info.face}</span></div>
            </div>
        )
    }
    list = async (num = 10, page = 1, ch = "", beg = 0, end = 0) => {
        let { data } = await api.faceLog(1, num, page, ch, beg, end)
        console.log(data);
        this.listDom(data)
    }
    listDom = (data) => {
        // console.log(data);
        if (!data.logs) {
            message.error('没有搜到结果')
            return
        }
        let formatDate = tool.formatDate
        let sortData = data.logs.sort((obj1, obj2) => {
            let time1 = obj1.ts
            let time2 = obj2.ts
            return time2 - time1
        })
        let listDom = sortData.map((item, index) => {
            return (
                <div className='layout list' key={index}>
                    <div className="operate-data">{formatDate(item.ts * 1000)}</div>
                    {/* <div className="face-db">通行库</div> */}
                    <div className="way-info">{item.ch}</div>
                    {/* <div className="record">开门</div> */}
                    {/* <div className="direction">进</div> */}
                    <div className="Snap-Shot">
                        <div className='get-img'>
                            <Zmage src={item.image} alt="" />
                            <span className='proportion'>抓拍照片</span>
                        </div>
                    </div>
                    <div className="contrast">
                        {
                            item.comps.map((item, index) => {
                                return (
                                    <div className='save-img' key={index + '_'}>
                                        <Zmage src={item.pic} alt="" />
                                        <span className='proportion'>相识度{item.sim * 100}%</span>
                                        <Popover placement="left" content={this.infoModel(item)} title="人物信息" trigger="click">
                                            <span className='proportion examine'>点击查看</span>
                                        </Popover>
                                    </div>
                                )
                            })
                        }


                    </div>
                </div>
            )
        })
        this.setState({
            listDom,
            totalNum: data.total
        })
    }
    render() {
        return (
            <div className='pass-log'>
                <div className="search">
                    <div>
                        <div className="key">日期：</div>
                        <div className="value">
                            <RangePicker
                                locale={locale}
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['开始时间', '结束时间']}
                                onChange={this.timeChange}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="key">通道信息:</div>
                        <div className="value">
                            <Input onChange={this.inputChange}></Input>
                        </div>
                    </div>
                    <div className="btn">
                        <Button onClick={this.search}><Icon type='search'></Icon>搜索</Button>
                    </div>
                    <div className="download">
                        <Button type="primary" onClick={this.download}><Icon type='download'></Icon>下载</Button>
                    </div>
                </div>
                <div className="title layout">
                    <div className="operate-data">操作日期</div>
                    {/* <div className="face-db">人脸库</div> */}
                    <div className="way-info">通道信息</div>
                    {/* <div className="record">行为记录</div> */}
                    {/* <div className="direction">方向</div> */}
                    <div className="Snap-Shot">抓拍照片</div>
                    <div className="contrast">比对库照片</div>
                </div>
                <div className="body">
                    {this.state.listDom}
                </div>
                <div className="page">
                    <Pagination onChange={this.pageChange} current={this.state.currentPage} pageSize={this.state.pageSize} total={this.state.totalNum} />
                </div>
            </div>
        );
    }
}

export default passLog;