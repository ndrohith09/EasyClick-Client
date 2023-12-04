import React, { Component } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  Flex,
  IconButton,
  Link,
  ListItem,
  UnorderedList,
  Button,
  GridItem,
  Grid,
  Text,
  Input,
  Switch,
  Badge,
  Heading,
  Container,
  CardHeader,
  CardBody,
  Spacer,
  Box,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';  
// const htmlContent = fs.readFileSync('src/pages/template-1/index.html', 'utf-8');
import {MdFullscreen, MdCheck, MdFullscreenExit, MdCardGiftcard} from 'react-icons/md';
import {BiLinkExternal} from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import instance from '../../api/api';
import cadence from "../../data/cadence.json";  

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class GroupDetails extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      test : '',

      isOpen: false,
      openDrawer: false,
      htmlContent : '',
      preview : false,
      editDrawer: false,
      group_data : {},
      plans : [],

      cadenceData : cadence,
      plan_name : '',
      cadence : '',
      price : '', 
      notes : '',
      points : '',

      u_plan_id : '',
      u_plan_notes : '',
      u_plan_points : '',
      u_plan_status : '',
    };
  }
  

  async componentDidMount() {
  
    const { params } = this.props;
    console.log("params");
    console.log(params);
    
      await instance({
        url: 'view-plans?group_id=' + params.id,
        method: 'GET',
        headers: { 
          Authorization: 'Bearer ' + localStorage.getItem('square_token'),
        }
      })
        .then((response) => { 
          console.log(response.data['BODY']);
          this.setState({ group_data : response.data['BODY'].group_data, plans : response.data['BODY'].plans });
        }
        )
        .catch((error) => {
          console.log(error);
        }
        ); 
  }

  onOpen = () => { 
    console.log('open');
    this.setState({ test : 'true' });
    // this.setState({ isOpen: true });
  };

  onClose = () => {
    this.setState({ test : 'false' });
  };

  handleSelectChange = (e) => {
    const selectedCadence = e.target.value;  
    const cadenceData = this.state.cadenceData; 
    const cadence = cadenceData.find((cadence) => cadence.id === parseInt(selectedCadence)); // not working
    this.setState({ cadence : cadence.cadence });
  }

  updatePlan = async (e, plan_id , plan_status) => {
    e.preventDefault(); 
    console.log(this.state.group_data.id , plan_id , plan_status);
    
    await instance({
      url: 'status-plan/',
      method: 'POST',
      headers : {
        Authorization: 'Bearer ' + localStorage.getItem('square_token'),
      },
      data: { 
        subscription_id : this.state.group_data.id,
        plan_id : plan_id,
        enable_plan : plan_status
      }
    })
    .then((response) => { 
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  
  }

  createPlan = async (e) => {
    e.preventDefault();
    console.log(this.state);

    var data = {
      subscription_group_id : this.state.group_data.id,
      plan_name: this.state.plan_name, 
      cadence: this.state.cadence,
      price: this.state.price,
      notes: this.state.notes,
      points: this.state.points,
    }
    console.log(data);

    instance({
      url: 'create-plan/',
      method: 'POST',
      data: data,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('square_token'),
      }
    })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {openDrawer, isOpen ,group_data , plans} = this.state;

    return (
      <DefaultLayout> 
        <Flex>
        <Box ml='3'>
          <Text color="gray.600" fontSize={23} as="b">
          {group_data.industry} / {group_data.group}
            <Badge ml='3' colorScheme={group_data.group_enabled ? 'green' : 'red' }>
            {group_data.group_enabled ? "Active" : "Inactivate"}
            </Badge>
          </Text>  
        </Box>
        </Flex>  
        <br />
        <Flex minWidth="max-content" alignItems="center" gap="2">
            <Box width={'100%'}>   
              <Input
                isReadOnly
                variant="filled"  
                backgroundColor={'white'}
                placeholder={group_data.api_endpoints}       
                style={{'border' : '1px solid #E2E8F0'}}         
                _placeholder={{ opacity: 1, color: 'gray.500' }}
              />
            </Box>
            <Spacer />
            <ButtonGroup gap="4">
              <Button
                onClick={e => {
                  window.open(`${group_data.api_endpoints}`, '_blank');
                }}
                color="gray.500"  
                style={{'backgroundColor' : "white" , 'border' : '1px solid #E2E8F0'}}
              >
                Share
              </Button>
              <Button
                onClick={e => {
                  window.open(`${group_data.api_endpoints}`, '_blank');
                }}
                color="gray.500"  
                style={{'backgroundColor' : "white" , 'border' : '1px solid #E2E8F0'}}
              >
                Open
              </Button>
            </ButtonGroup>
          </Flex>
        <br />  
        
        <Box ml='3' my={2} display={'inline-flex'}>
          <Text color="gray.600" fontSize={23}  as="b">
            My Plans
          </Text>   
          <a 
                    onClick={this.onOpen}
                    >
          Add Plan  
          </a> 
                  <Button
                    ml = '3'
                    size="sm"
                    borderRadius={'3'} 
                    onClick={this.onOpen}
                    fontSize={'xs'}  
                    color={'white'}
                    backgroundColor={'#3C50E0'}
                  >
                    Add Plan
                  </Button> 
        </Box>

        <Grid templateColumns="repeat(3,  4fr)" gap={4}>
        {plans.length > 0 ? (
                  plans.map((plan, index) => (
      <GridItem key={index}
      style={{'padding': '1.25rem' , 'borderRadius' :'22.5px'}}
      > 
        <Box  bg="white" py={12} borderRadius="md" textAlign="center" display="flex" flexDirection="column" alignItems="center">   
        <Box mb={4}> 
        <MdCardGiftcard color='#3C50E0' size={30} /> 
      </Box>            
          <Heading size="xs" style={{'marginBottom':'25px', 'color' :"#4A5568" , 'fontWeight' : 'normal' , 'textTransform' : 'uppercase'}}>{plan.subscription_plan_data.name}</Heading>
          <Text fontWeight="bold" color="#4A5568" fontSize="3xl" mb="24px" display="inline">$ {plan.subscription_plan_data.phases[0].recurring_price_money.amount}<Text fontSize="sm" display="inline">/{plan.subscription_plan_data.phases[0].cadence}</Text></Text>
          <Heading style={{ 'fontSize' : '16px' , 'marginBottom':'22px ' , 'color' :'#4A5568' , 'fontWeight' : 'bold', 'textTransform' : 'capitalize'}}>{plan.plan_notes}</Heading>
          {plan.plan_points.map((point , index) => {
            if (point !== " " && point !== "") {
              return <Text key={index} style={{ 'color': '#303132' , 
              'lineHeight' : '1.3' , 
              'marginBottom'  : '10px',
              'fontSize':"13px", 
              'display': 'flex',}}> <MdCheck color='#4A5568' /> &nbsp;{point}</Text>;
            }
            return null;
          })}  
          <Button 
          onClick={this.setState({u_plan_points: String(plan.plan_points), u_plan_notes: plan.plan_notes, editDrawer : true , u_plan_id : plan.id})}
          style={{'backgroundColor' :'#3C50E0' , 'color' : "#fff" , 'borderRadius' :'7px', 'fontSize' :'14px'}} px="8" my="5">Edit</Button>
           <Switch  
          defaultChecked={!plan.disabled}
          onChange={e => { 
            this.updatePlan(e , plan.id , e.target.checked);
          }}
          id='email-alerts' />
          
        </Box>
      </GridItem> 
  ))) : (
    <Text > No Plans </Text>
  )} 
    </Grid>   
        <br />
         State : {openDrawer.toString()} {openDrawer}
 

        <Drawer
           closeOnOverlayClick={false}
           onClose={this.onClose}
           isOpen={isOpen}
           size={'lg'} 
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{`Add Plan`}</DrawerHeader>
            <DrawerBody>
           
            </DrawerBody> 
          </DrawerContent>
        </Drawer> 
      </DefaultLayout>
    );
  }
}

const HOCGroupDetails = withRouter(GroupDetails);
export default HOCGroupDetails;




import React, { Component } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  Flex,
  IconButton,
  Link,
  ListItem,
  UnorderedList,
  Button,
  GridItem,
  Grid,
  Text,
  Input,
  Switch,
  Badge,
  Heading,
  Container,
  CardHeader,
  CardBody,
  Spacer,
  Box,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';  
// const htmlContent = fs.readFileSync('src/pages/template-1/index.html', 'utf-8');
import {MdFullscreen, MdCheck, MdFullscreenExit, MdCardGiftcard} from 'react-icons/md';
import {BiLinkExternal} from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import instance from '../../api/api';
import cadence from "../../data/cadence.json"; 

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}


class GroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 

      isOpen: false,
      openDrawer: false,
      htmlContent : '',
      preview : false,
      editDrawer: false,
      group_data : {},
      plans : [],

      cadenceData : cadence,
      plan_name : '',
      cadence : '',
      price : '', 
      notes : '',
      points : '',

      u_plan_id : '',
      u_plan_notes : '',
      u_plan_points : '',
      u_plan_status : '',
    };
  }
  

  async componentDidMount() {
  
    const { params } = this.props;
    console.log("params");
    console.log(params);
    
      await instance({
        url: 'view-plans?group_id=' + params.id,
        method: 'GET',
        headers: { 
          Authorization: 'Bearer ' + localStorage.getItem('square_token'),
        }
      })
        .then((response) => { 
          console.log(response.data['BODY']);
          this.setState({ group_data : response.data['BODY'].group_data, plans : response.data['BODY'].plans });
        }
        )
        .catch((error) => {
          console.log(error);
        }
        ); 
  }

  handleSelectChange = (e) => {
    const selectedCadence = e.target.value;  
    const cadenceData = this.state.cadenceData; 
    const cadence = cadenceData.find((cadence) => cadence.id === parseInt(selectedCadence)); // not working
    this.setState({ cadence : cadence.cadence });
  }

  updatePlan = async (e, plan_id , plan_status) => {
    e.preventDefault(); 
    console.log(this.state.group_data.id , plan_id , plan_status);
    
    await instance({
      url: 'status-plan/',
      method: 'POST',
      headers : {
        Authorization: 'Bearer ' + localStorage.getItem('square_token'),
      },
      data: { 
        subscription_id : this.state.group_data.id,
        plan_id : plan_id,
        enable_plan : plan_status
      }
    })
    .then((response) => { 
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  
  }

  createPlan = async (e) => {
    e.preventDefault();
    console.log(this.state);

    var data = {
      subscription_group_id : this.state.group_data.id,
      plan_name: this.state.plan_name, 
      cadence: this.state.cadence,
      price: this.state.price,
      notes: this.state.notes,
      points: this.state.points,
    }
    console.log(data);

    instance({
      url: 'create-plan/',
      method: 'POST',
      data: data,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('square_token'),
      }
    })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onOpen = () => { 
    console.log('open'); 
    this.setState({ isOpen: true });
  };

  onClose = () => {
    this.setState({ isOpen : false });
  };

  render() { 
    const {openDrawer, isOpen ,group_data , plans} = this.state;
    return (
      <DefaultLayout>
        <Flex>
        <Box ml='3'>
          <Text color="gray.600" fontSize={23} as="b">
          {group_data.industry} / {group_data.group}
            <Badge ml='3' colorScheme={group_data.group_enabled ? 'green' : 'red' }>
            {group_data.group_enabled ? "Active" : "Inactivate"}
            </Badge>
          </Text>  
        </Box>
        </Flex>  
        <br />
        <Flex minWidth="max-content" alignItems="center" gap="2">
            <Box width={'100%'}>   
              <Input
                isReadOnly
                variant="filled"  
                backgroundColor={'white'}
                placeholder={group_data.api_endpoints}       
                style={{'border' : '1px solid #E2E8F0'}}         
                _placeholder={{ opacity: 1, color: 'gray.500' }}
              />
            </Box>
            <Spacer />
            <ButtonGroup gap="4">
              <Button
                onClick={e => {
                  window.open(`${group_data.api_endpoints}`, '_blank');
                }}
                color="gray.500"  
                style={{'backgroundColor' : "white" , 'border' : '1px solid #E2E8F0'}}
              >
                Share
              </Button>
              <Button
                onClick={e => {
                  window.open(`${group_data.api_endpoints}`, '_blank');
                }}
                color="gray.500"  
                style={{'backgroundColor' : "white" , 'border' : '1px solid #E2E8F0'}}
              >
                Open
              </Button>
            </ButtonGroup>
          </Flex>
        <br />
         <Box ml='3' my={2} display={'inline-flex'}>
          <Text color="gray.600" fontSize={23}  as="b">
            My Plans
          </Text>  
                  <Button
                    ml = '3'
                    size="sm"
                    borderRadius={'3'} 
                    onClick={this.onOpen}
                    fontSize={'xs'}  
                    color={'white'}
                    backgroundColor={'#3C50E0'}
                  >
                    Add Plan
                  </Button> 
        </Box>

        
        <Drawer
           closeOnOverlayClick={false}
           onClose={this.onClose}
           isOpen={isOpen}
           size={'lg'} 
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{`Add Plan`}</DrawerHeader>
            <DrawerBody>
            <form action="#">
              <div className="p-6.5">  
              <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Group ID
                  </label>
                  <input
                    type="text"
                    placeholder={group_data.id}
                    disabled
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    name='plan_name'
                    id='plan_name'
                    placeholder="eg. Basic"
                    onChange={(e)=>this.setState({plan_name : e.target.value})}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div> 

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Short Description
                  </label>
                  <input
                    type="text"
                    name='notes'
                    id='notes'
                    onChange={(e)=>this.setState({notes : e.target.value})}
                    placeholder="eg. Basic provides access to all features"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div> 
 
            <div className="mb-4.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Cadence
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                     
                  </span>
                  <select 
                  onChange={this.handleSelectChange}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    {this.state.cadenceData.map((time, index) => (
                      <option 
                      key={index}                       
                      value={time.id}>{time.cadence}</option>
                    ))} 
                  </select>
                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div> 
            </div>  
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Price
                  </label> 
                  <input
                    type="number" 
                    onChange={(e)=>this.setState({price : e.target.value})}
                    placeholder="Currency in USD"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div> 

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Points
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Separate each point with a full stop (.)"
                    onChange={(e)=>this.setState({points : e.target.value})}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                <button
                onClick={this.createPlan}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Create Subscription
                </button>
              </div>
            </form>
              <br />
            </DrawerBody> 
          </DrawerContent>
        </Drawer> 

      </DefaultLayout>
    );
  }
}
 
const HOCGroupDetails = withRouter(GroupDetails);
export default HOCGroupDetails;