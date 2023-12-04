import DefaultLayout from '../../layout/DefaultLayout';
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
import React, { Component } from 'react';
import industry from '../../data/industry.json';
import template from '../../data/template.json';
import { useParams } from 'react-router-dom';
import instance from '../../api/api'; 

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class SubscriptionGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analytics_key: '',
      isOpen: false, 
      templates: template,
      industryDetails: {},
      group_name: '',
      template_type: '',
      plans :[],
      images : [
        'https://cdn.dribbble.com/users/34790/screenshots/11351412/media/26748ad022d30084e0752616b36b6cb9.png?compress=1&resize=1000x750&vertical=top',
        'https://cdn.dribbble.com/users/34790/screenshots/11351412/media/26748ad022d30084e0752616b36b6cb9.png?compress=1&resize=1000x750&vertical=top'
      ],
    };
  }

  async componentDidMount() {
    const { params } = this.props; 
    const data = industry.filter((item) => item.id == params.id); 
    this.setState({ industryDetails: data[0] });

    await instance({
      url: 'view-plans/?industry_id=' + params.id,
      method: 'GET',
      headers: { 
        Authorization: 'Bearer ' + localStorage.getItem('square_token'),
      }
    })
      .then((response) => { 
        console.log(response.data['BODY']);
        this.setState({ plans : response.data['BODY'].items });
      }
      )
      .catch((error) => {
        console.log(error);
      }
      );
  }

  onOpen = () => {
    this.setState({ isOpen: true });
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  getRandomImage = () => {
    const { images } = this.state;
    const randomIndex = Math.floor(Math.random() * images.length); 
    return images[randomIndex];
  }; 

   createSubscription = async(e) => {
    e.preventDefault();
    console.log(this.state.template_type );
    await instance({
      url : 'create-group/',
      method: "POST",
      data : {
        industry : this.state.industryDetails.name,
        industry_id : this.state.industryDetails.id,
        group_name : this.state.group_name,
        template_type : this.state.template_type,
        analytics_key : this.state.analytics_key
      },
      headers: { 
        // Authorization: 'Bearer ' + 'EAAAEA0tYbJTJzDRPAxWp8VQK2eVbNSh1Rhw_gb5Ff0um4naj1IfFATkN0-e8NMQ',
        Authorization: 'Bearer ' + localStorage.getItem('square_token'),
      }
    })
    .then((response) => {
      console.log(response);
      this.setState({ isOpen: false });
      window.location.href = '/groups/' + response.data['BODY'].subscription_group_id;
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    const { plans, isOpen, industryDetails, templates, template , analytics_key } =
      this.state;
    return (
      <DefaultLayout>
        <Flex>
          <Box p="4">
            <Button
              colorScheme="light"
              color={'gray.700'}
              onClick={this.onOpen}
              variant="outline"
            >
              + Add
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Text color="gray.600" fontSize={23} as="b">
              {industryDetails.name} Subscriptions
            </Text>
          </Box>
        </Flex>
        <br />
        
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Subscription
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Subscribers
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Plans
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            
              {plans.length > 0 ? (
                plans.map((item, index) => (
                  <tr>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <Link
                   onClick={() =>
                    (window.location.href = '/groups/' + item.id)
                  }
                  >
                  <h5 className="font-medium text-black dark:text-white">
                    {item.group}
                  </h5>
                  </Link>
                  <p className="text-sm">{item.industry}</p>
                </td>
  
                <td className="border-b border-[#eee] xl:pl-11 pl-9 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.subscribed_people.length }</p>
                </td>
                <td className="border-b border-[#eee] xl:pl-11 pl-9 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.plan.length}</p>
                </td>
                <td className="border-b border-[#eee] xl:pl-11 pl-9 py-5 px-4 dark:border-strokedark">
                  {item.group_enabled ? (
                    <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                    Active
                  </p>
                  ) : (
                    <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
                  Inactive
                </p>
                  )}
                  
                </td>              
                <td className="border-b border-[#eee] xl:pl-11 pl-9 py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary"
                     onClick={e => {
                      window.open(`${item.api_endpoints}`, '_blank');
                    }} 
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button> 
                  </div>
                </td>
                </tr>
                ))
              ) : (
                <td colSpan="5" className="xl:pl-11 pl-9 py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center justify-center">
                    <p className="text-black dark:text-white">No data found</p>
                  </div>
                </td>
              )} 
          </tbody>
        </table>
      </div>
    </div> 

        <Drawer
          closeOnOverlayClick={false}
          onClose={this.onClose}
          isOpen={isOpen}
          size={'xl'}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{`Create New Subscription`}</DrawerHeader>
            <DrawerBody>
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Industry Name
                    </label>
                    <input
                      type="text"
                      placeholder={industryDetails.name}
                      disabled
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Subscription Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={(e) =>
                        this.setState({ group_name: e.target.value })
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Analytics Write Key (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Write Key"
                      onChange={(e) =>
                        this.setState({ analytics_key: e.target.value })
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <br />
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Choose Your Template
                    </label>
                    <RadioGroup 
                    >
                      <Stack direction="row">
                        {templates.map((template, index) => (
                          <Card maxW="xs" key={index}>
                            <Image
                              objectFit="cover"
                              src={template.img}
                              alt="Chakra UI"
                            />

                            <CardFooter justify="space-between" flexWrap="wrap">
                              <Radio size="md" 
                              value={String(template.value)}
                              onChange={(e) =>
                                this.setState({ template_type: e.target.value })
                              }
                              >
                                {template.name}
                              </Radio>
                            </CardFooter>
                          </Card>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </div>

                  <button
                    onClick={this.createSubscription}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
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

const HOCSubscriptionGroup = withRouter(SubscriptionGroup);
export default HOCSubscriptionGroup;
