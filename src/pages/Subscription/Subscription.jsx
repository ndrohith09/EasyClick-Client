import DefaultLayout from '../../layout/DefaultLayout';
import {
  HStack,
  Stack,
  Image,
  Link,
  SimpleGrid,
  Button,
  Text,
  Card,
  Heading,
  CardHeader,
  CardBody,
  Spacer,
  Box,
} from '@chakra-ui/react';
import React, { Component } from 'react'
import industry from "../../data/industry.json";
import CardOne from '../../components/CardOne';
import CardThree from '../../components/CardThree';
import CardTwo from '../../components/CardTwo';   
import CardFour from '../../components/CardFour';
import instance from '../../api/api';

class Subscription extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            templates : industry,
            plans : [],
            live_plans : [],
            disabled_plans : [],
            subscribed_people : []
        }
    } 

    async componentDidMount() {  

        await instance({
          url: 'view-plans?home_groups=true',
          method: 'GET',
          headers: { 
            Authorization: 'Bearer ' + localStorage.getItem('square_token'),
          }
        })
          .then((response) => { 
            console.log(response.data['BODY']);
            this.setState({
              plans: response.data['BODY'].items,
              subscribed_people : response.data['BODY'].subscribed_people,
              disabled_plans : response.data['BODY'].disabled_plans,
              live_plans : response.data['BODY'].live_plans,
            });
          }
          )
          .catch((error) => {
            console.log(error);
          }
          ); 
    }

    render() { 
        const {templates, plans, subscribed_people,disabled_plans, live_plans} = this.state;
        return (
            <DefaultLayout>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne people={subscribed_people.length} />
        <CardTwo live={live_plans.length} />
        <CardThree plans={plans.length} />
        <CardFour disabled={disabled_plans.length}/>
      </div> 
        <br /> 
          <Text color="gray.600" fontSize={23} as="b">
            Select Category
          </Text> 
        <br />
        <br />
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              >
                 {templates.length > 0 ? (
                    templates.map((template, index) => (
                <Card maxW="sm" variant="outline" key={index}
                align={'center'}
                >
                    <CardBody>
                      <Link onClick={() => window.location.href="/subscription/"+template.id}>
                        <Image
                          boxSize="200px"
                          src={template.image}
                          alt={template.name}
                          borderRadius="lg"
                          mb="4"
                        />
                      </Link>
        
                      <Stack>
                        <Box
                          as="span"
                          color="gray.600"
                          fontSize="md"
                          fontWeight={'bold'}
                        >
                          {template.name}
                        </Box> 
                      </Stack>
                    </CardBody>
                  </Card>
                    ))
                  ) : (
                    <Text fontSize={'sm'}>No Templates found</Text>
                  )}
              </SimpleGrid>
              <br />
            </DefaultLayout>
          );
    }
}
 
export default Subscription;