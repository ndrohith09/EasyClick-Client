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

class Subscribers extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            templates : [
                {
                  id: 1,
                  name : "Beauty Salon",
                  image : "https://cdn.dribbble.com/users/34790/screenshots/11351412/media/26748ad022d30084e0752616b36b6cb9.png?compress=1&resize=1000x750&vertical=top",
                  groups : 12
                },
                {
                  id: 2,
                  name : "Boutique",
                  image : "https://cdn.dribbble.com/users/34790/screenshots/11351412/media/26748ad022d30084e0752616b36b6cb9.png?compress=1&resize=1000x750&vertical=top",
                  groups : 10
                },
                {
                  id: 3,
                  name : "Book Store",
                  image : "https://cdn.dribbble.com/users/34790/screenshots/11351412/media/26748ad022d30084e0752616b36b6cb9.png?compress=1&resize=1000x750&vertical=top",
                  groups : 7
                },
              ]
        }
    } 
    render() { 
        const {templates} = this.state;
        return (
            <DefaultLayout>
              {/* <Breadcrumb pageName="Subscription" />  */} 
          <Text color="gray.600" fontSize={23} as="b">
            Subscriber Groups
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
                      <Link onClick={() => window.location.href="/subscribers/"+template.id}>
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
                        <Text fontSize={'sm'}>{template.groups} Groups</Text>
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
 
export default Subscribers;