import React, { Component } from 'react'
import DefaultLayout from '../../layout/DefaultLayout';
import { Bar, Doughnut, Line, PolarArea} from "react-chartjs-2"; 
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, RadialLinearScale, LinearScale,Title, ArcElement, Tooltip } from "chart.js";
import CustomerData from "../../data/customer.json"
import {
    Flex,
    Stack,
    Image,
    Link,
    SimpleGrid,
    Button,
    Text,
    Card,
    Badge,
    RadioGroup,
    Radio,
    Heading,
    CardFooter,
    CardHeader,
    CardBody,
    Spacer,
    Box,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react';

class Loyality extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false, 
      onShow: "no",
      msg : "Click Start to make predictions",
      customer: CustomerData
    }
  }

  onOpen = () => {
    this.setState({ isOpen: true });
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  onShow = () => {
    console.log('onshow');

    this.setState({ msg : "Please wait while we make predictions..." });
    
    setTimeout(() => {
      console.log('Hello, World!')
      alert('Oops! Something went wrong.');
    this.setState({ msg : "Click Start to make predictions" });
    }, 4000);
    
  }


  

    render() { 
      const { isOpen , onShow ,customer, msg} = this.state;
        return (
            <DefaultLayout>
        <Flex >
          <Box p="4" justifyContent='space-between'>
          <Text color="gray.600" fontSize={23} as="b">
             Loyality Anlaysis
            </Text> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <Button
              colorScheme="light"
              color={'gray.700'}
              onClick={this.onShow}
              variant="outline"
            >
              Start Predictions
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          
            
          </Box>
        </Flex>
        
        <br /> 
        { onShow === "yes"  ? 
<div>

<div class="grid grid-flow-col">
  <div> <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
<div className="chart-container"> 


        <Text color="gray.600" textAlign={'center'} fontSize={12}> Customer Analyis                 
            </Text>  
                <Bar 
                data = {{
                  labels : ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
                  datasets: [ 
                    {
                      label:'Customers',
                      data:[1,5,6,2,8 ,9,6],
                      backgroundColor:'rgba(255, 99, 132, 0.2)',
                      borderColor : 'rgb(255, 99, 132)',
                      borderWidth: 0.4
                    }
                
                  ],
                
                }}

                option = {{
                  responsive: true,
                  plugins: {
                    legend: { position: "chartArea" },
                    title: {
                      display: true,
                      text: "Modular Bar Chart",
                    },
                  },
                }}
                />

                
</div>
</div></div>
  <div>
  <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
<div className="chart-container"> 
        <Text color="gray.600" textAlign={'center'} fontSize={12}>
             Loyality Anlaysis
            </Text>  
                <PolarArea 
                data = {{
                  labels : ["0-20", "21-40", "41-60", "61-80","81-100"],
                  datasets: [ 
                    {
                      label:'Loyality',
                      data:[1,2,5,4,3],
                      backgroundColor:'rgba(54, 162, 235, 0.2)',
                      borderColor: 'rgb(54, 162, 235)',
                      borderWidth: 0.4
                    }
                
                  ],
                
                }}

                option = {{
                  responsive: true,
                  hoverOffset: 4,
                  plugins: {
                    legend: { position: "chartArea" },
                    title: {
                      display: true,
                      text: "Modular Doughnut Chart",
                    },
                  },
                }}
                />

                
</div>
</div>
  </div>
</div> 
    
  <br />
  <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
 <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Email
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Phone
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Loyality Score
              </th> 
            </tr>
          </thead>
          <tbody>

          {
            customer.map((item , index) => (
              <tr key={index}>
              <td className="border-b border-[#eee] xl:pl-11 pl-9 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.name}</p>
              </td>
              <td className="border-b border-[#eee] xl:pl-11 pl-9 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.email}</p>
              </td>
              <td className="border-b border-[#eee] xl:pl-11 pl-9 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.phone}</p>
              </td>
              <td className="border-b border-[#eee] xl:pl-11 pl-9 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.loyality}</p>
              </td>   
                  </tr>
            ))
          }
           
             
          </tbody>
        </table>
      </div>
      </div> 
      </div>
      : 
      <> 
      {msg}      

      </>} 

     
      </DefaultLayout>
        );
    }
}
ChartJS.register(CategoryScale, LinearScale, BarElement,RadialLinearScale,Title,Tooltip,Legend, ArcElement); 
export default Loyality;
