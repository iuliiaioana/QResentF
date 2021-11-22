import React from 'react';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import {
  Popconfirm, Tooltip, Card, Col, PageHeader,
  Row, Spin, Empty, Button, Tabs, Modal, Form, Select,
  Divider, Input, Collapse, Switch,
  message, Dropdown, Menu, Typography, DatePicker,TimePicker
} from 'antd';
import Chart from "react-apexcharts";
import {
  PlusOutlined
} from '@ant-design/icons'
const dateFormat = 'YYYY-MM-DD'
const { RangePicker } = DatePicker
const {Option} = Select


export default function Statistics() {

  const [date,setDate] = useState('')
  const [subjects,setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [firstHour,setFirstHour] = useState('')
  const [userID] = useState(()=>{
    let token = JSON.parse(localStorage.getItem('token'));
    return token['user_id'];
  })
  const [rol] = useState(()=>{
    let token = JSON.parse(localStorage.getItem('token'));
    return token['user_rol'];
  })
  const [secondHour,setSecondHour] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [donutOptions, setDonutOptions] = useState({'series':[],labels:[]})
  const [actData, setActData] = useState({'series':[],labels:[]})
  const [barOptions, setBarOptions] = useState({options: {
                                                          chart: {
                                                            id: "basic-bar"
                                                          },
                                                          xaxis: {
                                                            categories: []
                                                          }
                                                        },
                                                        series: [
                                                          {
                                                            name: "Prof per Activitate",
                                                            data: []
                                                          }
                                                        ]
                                                      })

  useEffect(()=>{
    console.log(barOptions)
  },[barOptions])
  

  const getSubjectsFromServer = async () =>{
    
    const res = await fetch('http://localhost:5000/materii', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      },
    })
    return res
  }

  const getSubjects = () =>{

    getSubjectsFromServer().then(res =>{
       res.json().then(res =>{
         console.log(res)
        setSubjects(res)
       })
    })
  }

  const getStatisticsFromServer = async (body) =>{
    
    const res = await fetch('http://localhost:5000/stats', {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    return res
  }

  const getStatistics = (body) =>{

    getStatisticsFromServer(body).then(res =>{
      if(res.status === 200){
       res.json().then(res =>{
         console.log(res)
         let l1 = []
         let l2 = []
         Object.entries(res.GrupaPerAct).map(([key, value]) => {
          l1.push(key)
          l2.push(value)
         })
         let donut = {}
         donut['series'] = l2
         donut['labels'] = l1
         setDonutOptions(donut)
         l1 = []
         l2 = []
         if (res.ActDataStatus["28"] != undefined) {
           Object.entries(res.ActDataStatus["28"]["22.11.2021"]).map(([key, value]) => {
             l1.push(key)
             l2.push(value)
            })
         }
         let actData = {}
         actData['series'] = l2
         actData['labels'] = l1
         setActData(actData)
         l1 = []
         l2 = []
         Object.entries(res.ProfSubNo).map(([key, value]) => {
          l1.push(key)
          l2.push(value)
         })
         let bar = {...barOptions}
         bar.options.xaxis.categories = l1
         bar.series[0].data = l2
         setBarOptions(bar)

       })
      }else{
        setDonutOptions({'series':[],labels:[]})
        setBarOptions({options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: []
          }
        },
        series: [
          {
            name: "Prof per Activitate",
            data: []
          }
        ]
      })
      }
    })
  }

  useEffect(()=>{
    getSubjects()
  },[])


  return (
    <>
        <Row style={{marginLeft:'5%'}} gutter="16">
            <PageHeader
              style={{marginLeft:'40px'}}
              title={<>Statistics</>}/>
              <Divider type='horizontal'/>
              <Row gutter="16">
                    <Col>
                    <div style={{display:'flex',flexDirection:'column'}}>
                      <div style={{marginBottom:'5px'}}>
                        Pick date for statistics
                      </div>
                    <DatePicker
                                    format="DD-MM-YYYY"
                                    bordered={true}
                                    onChange={(date, dateString)=>{
                                      console.log(dateString)
                                      setDate(dateString)
                                    }}
                                    style={
                                        { color: "#BA88E2" }
                                    }
                                    // showTime
                                />
                    </div>
                    </Col>
               <Col>
               <div style={{display:'flex',flexDirection:'column'}}>
               <div style={{marginBottom:'5px'}}>
                        Pick first hour of interval
                      </div>
               <TimePicker
                format="HH"
                onChange={(time,timeString)=>{
                  setFirstHour(timeString)
                }}
               />
               </div>
               </Col>
               <Col>
               <div style={{display:'flex',flexDirection:'column'}}>
               <div style={{marginBottom:'5px'}}>
                        Pick second hour of interval
                      </div>
               <TimePicker
                format="HH"
                onChange={(time,timeString)=>{
                  console.log(timeString)
                  setSecondHour(timeString)
                }}
               />
              </div>
               </Col>
               <Col>
               <div style={{display:'flex',flexDirection:'column'}}>
               <div style={{marginBottom:'5px'}}>
                        Pick day
                      </div>
                <Select allowClear placeholder={'Pick a day'} showSearch onDeselect={()=>{
                  setSelectedDay('')
                }} onSelect={(e)=>{
                  setSelectedDay(e)
                }}>{
                 ['luni','marti','miercuri','joi','vineri'].map(item=>{
                   return <Option value={item} key={item}>{item}</Option>
                 })
                 }</Select>
              </div>
               </Col>
               <Col>
               <div style={{display:'flex',flexDirection:'column'}}>
               <div style={{marginBottom:'5px'}}>
                        Pick a subject to see statistics
                      </div>
                <Select allowClear placeholder={'Pick a subject'} showSearch onDeselect={()=>{
                  setSelectedSubject(null)
                }} onSelect={(sub)=>{
                  let subj = subjects.filter(item =>{
                    return item.nume === sub
                  })
                  setSelectedSubject(subj[0])
                }}>{
                  subjects.map((item, index)=>{
                    return <Option value={item.nume} key={index}>{item.nume}</Option>
                  })
                  }</Select>
               
              </div>
               </Col>
               <Col>
               <div style={{marginLeft:'90%', marginTop:'10%'}}>
                <Button 
                type="primary"
                disabled={date === '' || firstHour === '' || secondHour === '' || selectedDay === '' || selectedSubject === null}
                onClick={() => {
                  let body = {}
                  body['interval'] = firstHour + ':' + secondHour
                  body['zi'] = selectedDay
                  console.log(selectedSubject)
                  body['id_prof'] = selectedSubject['id_profesor']
                  body['materie'] = selectedSubject['nume']
                  body['data'] = date.replaceAll('-','.')
                  console.log(body);
                  getStatistics(body)
                }}>
                {'Search'}</Button>
            </div>
               </Col>

              </Row>
              <Divider type='horizontal'/>
              <div style={{width:'90%'}}>
              <Row gutter={3} justify="space-between">
                {
                <div className="donut" style={{display:'flex'}}>
                <div>
                  <div>Groups per activity</div>
                <Chart options={{labels:donutOptions.labels}} series={donutOptions.series} type="donut" width="380" />
                </div>
                <div>
                  <div>Attendance per interval</div>
                <Chart options={{labels:actData.labels}} series={actData.series} type="donut" width="380" />
                </div>
                <div>
                  <div>Subjects per professor</div>
                <Chart
                  options={{
                    chart: {
                      id: "basic-bar"
                    },
                    xaxis: {
                      categories: barOptions.options.xaxis.categories
                    }
                  }}
                  series={barOptions.series}
                  type="bar"
                  width="500"
                />
                </div>
              </div>
              }
              </Row>

              </div>
        </Row>
           </>
  );
}