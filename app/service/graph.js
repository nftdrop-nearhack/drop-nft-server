const Service = require('./service')
const ethers = require('ethers')
const config = require('../../conf/config.js')
const LinkABI = require('../../res/abi/Chainlink.json')
const BigNumber = ethers.BigNumber
const axios = require('axios')



class GraphService extends Service {
    async query(subgraph, query) {
        console.log('query:',subgraph, query)
        let resp = await axios.post(subgraph, query)
        // console.log('resp:', resp.data)
        return resp.data.data
    }

    async swapCount(swapGraph, address) {
        let query = {
            "query":`{swaps(where:{to:"${address}" }){
                id
                sender
                to
                timestamp
              }
              mints(where:{to:"${address}"}){
                id
                sender
                to
                timestamp
              }
              burns(where:{sender:"${address}"}){
                id
                sender
                to
                timestamp
              }
            }`,
            "variables":null
        }
        let resp = await this.query(swapGraph, query)
        return resp.swaps.length + resp.mints.length + resp.burns.length
    }

    async swapAddlpCount(swapGraph, address) {
        let query = {
            "query":`{
                liquidityPositionSnapshots(first:1000,skip:0, where:{user:"${address}"}){
                  id
                  timestamp
                  user{
                    id
                  }
                }
              }`,
            "variables":null
        }
        let resp = await this.query(swapGraph, query)
        return resp.liquidityPositionSnapshots.length
    }

    async sushiSwapCount(address) {
        return await this.swapCount(config.graph.subgraphs.sushi, address)
    }

    async sushiAddlpCount(address) {
        return await this.swapAddlpCount(config.graph.subgraphs.sushi, address)
    }

    async quickSwapCount(address) {
        return await this.swapCount(config.graph.subgraphs.quick, address)
    }

    async quickAddlpCount(address) {
        return await this.swapAddlpCount(config.graph.subgraphs.quick, address)
    }
}

module.exports = GraphService;