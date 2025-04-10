"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col,Table,  Button } from "react-bootstrap";

import TopNavi from "../components/TopNavi";
import "./page.css";

import { connectMQTT, mqttclient,idtopic,subscribeMQTT, publishMQTT } from '../lib/MetaworkMQTT'


var hasRun = false;

const Page = () => {

  const [clients, setClients] = useState([]);
  const [events, setEvents] = useState([]);

  // ページが開いたら１回だけ実行される処理
  const doit = () => {
    const mq = connectMQTT();
    window.mqttclient = mq;
    window.mqttclient.on('message', (topic, message) => {
      if (topic === "/msg/status"){ // デバイスへの連絡用トピック
        let data = JSON.parse(message.toString())   
        setClients(data);
        console.log("status", data);
      }
    })
  }

  useEffect(() => {
    // ページが開かれた時に実行される関数
    if (!hasRun) {
      hasRun = true;
      const mq = connectMQTT();
      window.mqttclient = mq;
      window.mqttclient.on('message', (topic, message) => {
        if (topic === "mgr/status"){ // デバイスへの連絡用トピック
          let data = JSON.parse(message.toString())   
          setClients(data);
          console.log("status", data);
        }
        if (topic==="mgr/event"){
          let data = JSON.parse(message.toString())   
          console.log("event", data);
          setEvents((cur)=> {cur.unshift(data); return cur});
        }
      })
    }
  }, []); // 空の配列を渡すことで、初回レンダリング時のみ実行されます

  return (
    <div>
      <TopNavi />

      <div>
        <div>
          <Container fluid="md" > 
          <h3>Metawork MQTT Monitor</h3>

                <Row> <Col> Metawork Clients </Col></Row>
                <Row><Col>
                  <Table border={2} data-bs-theme="dark" striped size="lg">
                  <thead><tr><td></td><td>Type</td><td>ver</td><td>devType</td><td>devId</td><td>date</td></tr>
                  </thead>
                  <tbody>
                    { clients.map((client, index) => 
                      <tr key={index}>
                      <td> {index}</td>
                      <td> {client.type}</td>
                      <td> {client.version}</td>
                      <td> {client.devType}</td>
                      <td> {client.devId}</td>
                      <td> {client.date}</td>
                      </tr>)
                    }
                  </tbody>
                  </Table></Col>
                </Row>
                <Row> <Col> Events </Col></Row>
                <Row>
                  <Col>
                  <Table border={2} data-bs-theme="dark" striped size="lg">
                  <thead><tr><td></td><td>event</td><td>type</td><td>from</td><td>to</td><td>date</td></tr>
                  </thead>
                  <tbody>
                   { events.map((ev,index) =>
                   <tr key={index}>
                    <td>{index}</td>
                    <td>{ev.event}</td>
                    <td>{ev.from.type}</td>
                    <td>{ev.from.devId}</td>
                    <td>{ev.to.devId}</td>
                    </tr>
                  )} 
                   </tbody>
                   </Table></Col>
                </Row>

          </Container>
        </div>
      </div>
    </div>
  );
};

export default Page;