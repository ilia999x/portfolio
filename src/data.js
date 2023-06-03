import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Box,
  Flex,
  UnorderedList,
  Center,
  Text,
  Stack,
  Button,
  Icon,
  Heading,
  Tooltip,
  CircularProgress,
  useDisclosure,
  Link,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react"

import { ReactComponent as GraphqlIcon } from "./icons/graphql.svg"
import { ReactComponent as ApiIcon } from "./icons/api-1.svg"
import { ReactComponent as MongodbIcon } from "./icons/mongodb-original.svg"

import { ReactComponent as AwsIcon } from "./icons/aws.svg"
import { ReactComponent as google_cloud_platformIcon } from "./icons/google-cloud-platform.svg"
import { ReactComponent as cloudflareIcon } from "./icons/cloudflare.svg"
import { ReactComponent as DigitaloceanIcon } from "./icons/digitalocean.svg"

import { ReactComponent as DjangoIcon } from "./icons/django.svg"
import { ReactComponent as nodejsIcon } from "./icons/nodejs.svg"
import { ReactComponent as fastapiIcon } from "./icons/fastapi.svg"

import { ReactComponent as nextjsIcon } from "./icons/nextjs.svg"
import { ReactComponent as ReactIcon } from "./icons/react.svg"
import { ReactComponent as react_native } from "./icons/sdk-react-native.svg"
import { ReactComponent as PostgresqlIcon } from "./icons/postgresql.svg"
import { ReactComponent as RedisIcon } from "./icons/redis-original-wordmark.svg"

import { ReactComponent as KubernetesIcon } from "./icons/kubernetes.svg"
import { ReactComponent as JenkinsIcon } from "./icons/jenkins-original.svg"
import { ReactComponent as nginxIcon } from "./icons/nginx.svg"
import { ReactComponent as rabbitmqIcon } from "./icons/rabbitmq.svg"
import { ReactComponent as celeryIcon } from "./icons/celery.svg"

import { ReactComponent as DockerIcon } from "./icons/docker-original-wordmark.svg"
import { ReactComponent as postmanIcon } from "./icons/postman.svg"
import { ReactComponent as gitIcon } from "./icons/git.svg"
import { ReactComponent as githubIcon } from "./icons/github-original-wordmark.svg"

import { ReactComponent as golangIcon } from "./icons/golang.svg"
import { ReactComponent as PythonIcon } from "./icons/python.svg"
import { ReactComponent as JavascriptIcon } from "./icons/javascript-js.svg"
import { ReactComponent as html5Icon } from "./icons/html5-original-wordmark.svg"
import { ReactComponent as CssIcon } from "./icons/file-type-css.svg"

const op_value = 0.8

export const Data_Center = {
  value: 10,
  name: "Cloud providers",
  opacity: op_value,
  x: 10,
  y: 10,
  stroke: "#eee",
  color: "#5b5b646f",
  icons: [
    {
      x: 270,
      y: 200,
      icon: DigitaloceanIcon,
      text: "digitalocean",
      comp: (
        <>
          <UnorderedList>
            <ListItem>Droplets</ListItem>
            <ListItem>Kubernetes</ListItem>
            <ListItem>Spaces</ListItem>
            <ListItem>App Platform</ListItem>
            <ListItem>Cloud Functions</ListItem>
            <ListItem>Container Registry</ListItem>
          </UnorderedList>
        </>
      ),
    },
    {
      x: 200,
      y: 200,
      icon: AwsIcon,
      text: "aws",
      comp: (
        <>
          <UnorderedList>
            <ListItem>EC2</ListItem>
            <ListItem>S3</ListItem>
            <ListItem>RDS</ListItem>
            <ListItem>ELB</ListItem>
            <ListItem>Amazon CloudFront</ListItem>
            <ListItem>Amazon Route 53</ListItem>
          </UnorderedList>
        </>
      ),
    },
    { x: 200, y: 250, icon: cloudflareIcon, text: "cloudflare", comp: <></> },

    {
      x: 270,
      y: 250,
      icon: google_cloud_platformIcon,
      text: "google cloud platform",
      comp: (
        <>
          <UnorderedList>
            <ListItem>Droplets</ListItem>
            <ListItem>Kubernetes</ListItem>
            <ListItem>Spaces</ListItem>
            <ListItem>App Platform</ListItem>
            <ListItem>Cloud Functions</ListItem>
          </UnorderedList>
        </>
      ),
    },
  ],
}

export const Data_Main = [
  {
    value: 10,
    name: "Back-end frameworks",
    opacity: op_value,
    x: 700,
    y: 5,
    color: "#43534b",
    icons: [
      {
        x: 300,
        y: 90,
        icon: DjangoIcon,
        text: "Django",
        comp: (
          <>
            <UnorderedList color="#dbdbdb">
              <ListItem>MVC</ListItem>
              <ListItem>ORM</ListItem>
              <ListItem>URL routing</ListItem>
              <ListItem>Channels(sockets)</ListItem>
              <ListItem>Authentication and Authorization</ListItem>
              <ListItem>Templating engine</ListItem>
              <ListItem>Middleware</ListItem>
              <ListItem>Testing</ListItem>
              <ListItem>Third-party libraries</ListItem>
              <ListItem>Integrated Celery</ListItem>
              <ListItem>Integrated Redis</ListItem>
            </UnorderedList>
          </>
        ),
      },
      {
        x: 350,
        y: 120,
        icon: fastapiIcon,
        text: "Fast API",
        comp: (
          <>
            <UnorderedList color="#dbdbdb">
              <ListItem>Type annotations</ListItem>
              <ListItem>Async</ListItem>
              <ListItem>Testing</ListItem>
              <ListItem>Integrated Celery</ListItem>
              <ListItem>Integrated Redis</ListItem>
            </UnorderedList>
          </>
        ),
      },

      {
        x: 380,
        y: 160,
        icon: nodejsIcon,
        text: "Nodejs",
        comp: (
          <>
            <UnorderedList color="#dbdbdb">
              <ListItem>npm</ListItem>
              <ListItem>Cross-platform</ListItem>
              <ListItem>Electron</ListItem>
            </UnorderedList>
          </>
        ),
      },
    ],
  },
  {
    value: 10,
    name: "Back-end servers",
    opacity: op_value,
    x: 900,
    y: 400,
    color: "#4d4944",
    icons: [
      { x: 400, y: 230, icon: KubernetesIcon, text: "Kubernetes" ,comp: (
        <>
          <UnorderedList color="#dbdbdb">
            <ListItem>Container orchestration</ListItem>
            <ListItem>Automated deployment, scaling, and management of containerized applications</ListItem>
            <ListItem>Efficient management of resources, including cron jobs and volumes</ListItem>
          </UnorderedList>
        </>
      )},
      { x: 350, y: 240, icon: JenkinsIcon, text: "Jenkins" ,
      comp: (
        <>
          <UnorderedList color="#dbdbdb">
            <ListItem>Continuous Integration/Continuous Deployment (CI/CD)</ListItem>
            <ListItem>Open-source automation server</ListItem>
            <ListItem>Plugins to support building, deploying, and automating any project</ListItem>
          </UnorderedList>
        </>
      )},
      { x: 340, y: 290, icon: nginxIcon, text: "nginx" ,
      comp: (
        <>
          <UnorderedList color="#dbdbdb">
            <ListItem>High-performance web server</ListItem>
            <ListItem>Reverse proxy server</ListItem>
            <ListItem>Load balancer</ListItem>
            <ListItem>HTTP cache</ListItem>
            <ListItem>Ingress-NGINX Controller for Kubernetes</ListItem>
          </UnorderedList>
        </>
      )},
      { x: 390, y: 300, icon: rabbitmqIcon, text: "rabbitmq" ,
      comp: (
        <>
          <UnorderedList color="#dbdbdb">
            <ListItem>Message broker</ListItem>
            <ListItem>Distributed message queue</ListItem>
            <ListItem>Supports multiple messaging protocols</ListItem>
          </UnorderedList >
        </>
      )},
      { x: 340, y: 340, icon: celeryIcon, text: "celery" ,
      comp: (
        <>
          <UnorderedList color="#dbdbdb">
            <ListItem>Distributed task queue</ListItem>
            <ListItem>Supports scheduling and executing tasks in real time</ListItem>
            <ListItem>Integrates with other technologies such as RabbitMQ and Redis</ListItem>
          </UnorderedList>
        </>
      )
    },
    ],
  },
  {
    value: 10,
    name: "Databases",
    opacity: op_value,
    x: 10,
    y: 700,
    color: "#47444d",
    icons: [
      {
        x: 140,
        y: 360,
        icon: RedisIcon,
        text: "Redis",
        comp: (
          <>
            <UnorderedList color="#dbdbdb">
              <ListItem>Fast in-memory data store</ListItem>
              <ListItem>Supports key-value, hashes, sets, and more</ListItem>
              <ListItem>Publish/subscribe messaging system</ListItem>
              <ListItem>Distributed</ListItem>
            </UnorderedList>
          </>
        ),
      },
      {
        x: 230,
        y: 400,
        icon: PostgresqlIcon,
        text: "Postgresql",
        comp: (
          <>
            <UnorderedList color="#dbdbdb">
              <ListItem>Relational database management system</ListItem>
              {/* <ListItem>Open source</ListItem> */}
              <ListItem>Scalable and secure</ListItem>
              <ListItem>Supports SQL</ListItem>
              <ListItem>ACID compliant</ListItem>
            </UnorderedList>
          </>
        ),
      },
    ],
  },

  {
    value: 10,
    name: "Front-end",
    opacity: op_value,
    x: 1,
    y: 200,
    color: "#444a4d",
    icons: [
      {
        x: 80,
        y: 180,
        icon: ReactIcon,
        text: "React",
        comp: (
          <>
            <UnorderedList color="#dbdbdb">
              <ListItem>Declarative programming</ListItem>
              <ListItem>Virtual DOM</ListItem>
              <ListItem>Component-based architecture</ListItem>
              <ListItem>Hooks</ListItem>
              <ListItem>Context API</ListItem>
              <ListItem>Redux (optional)</ListItem>
            </UnorderedList>
          </>
        ),
      },
      {
        x: 80,
        y: 250,
        icon: react_native,
        text: "React Native",
        comp: (
          <>
            <UnorderedList color="#dbdbdb">
              <ListItem>Native components</ListItem>
              <ListItem>Declarative programming</ListItem>
              <ListItem>Virtual DOM</ListItem>
              <ListItem>Component-based architecture</ListItem>
              <ListItem>Hooks</ListItem>
              <ListItem>Context API</ListItem>
              <ListItem>Redux (optional)</ListItem>
            </UnorderedList>
          </>
        ),
      },
      {
        x: 80,
        y: 300,
        icon: nextjsIcon,
        text: "NextJS",
        comp: (
          <>
            <UnorderedList color="#dbdbdb">
              <ListItem>Server-side rendering</ListItem>
              <ListItem>Static site generation</ListItem>
              <ListItem>API routes</ListItem>
              <ListItem>File-based routing</ListItem>
              <ListItem>Automatic code splitting</ListItem>
              <ListItem>Image optimization</ListItem>
              <ListItem>Dynamic imports</ListItem>
            </UnorderedList>
          </>
        ),
      },
    ],
  },
  {
    value: 5,
    name: "Communicators",
    opacity: op_value,
    x: 110,
    y: 2,
    color: "#4d4444",
    icons: [
      {
        x: 190,
        y: 120,
        icon: GraphqlIcon,
        text: "Graphql",
        comp: (
          <>
            <UnorderedList color="#dbdbdb">
              <ListItem>Queries</ListItem>
              <ListItem>Mutations</ListItem>
              <ListItem>Resolvers</ListItem>
              <ListItem>Subscriptions</ListItem>
              <ListItem>Long polling</ListItem>
              <ListItem>Strongly typed</ListItem>
            </UnorderedList>
          </>
        ),
      },
      {
        x: 170,
        y: 70,
        icon: ApiIcon,
        text: "API",
        comp: (
          <>
            <UnorderedList color="#dbdbdb">
              <ListItem>HTTP methods (GET, POST, PUT, DELETE)</ListItem>
              <ListItem>RESTful architecture</ListItem>
              <ListItem>Authentication and Authorization</ListItem>
              <ListItem>Error handling</ListItem>
              <ListItem>Versioning</ListItem>
              <ListItem>Caching</ListItem>
            </UnorderedList>
          </>
        ),
      },
    ],
  },
  // { value: 10, color: '#00a896', icons: [DigitaloceanIcon, PythonIcon] },
]

export const ToolData = [
  { text: "git", icon: gitIcon, comp: (
    <>
      <UnorderedList color="#dbdbdb">
        <ListItem>Repositories</ListItem>
        <ListItem>Commits</ListItem>
        <ListItem>Branches</ListItem>
        <ListItem>Merging</ListItem>
        <ListItem>Git Commands</ListItem>
      </UnorderedList>
    </>
  ), },
  {
    text: "github",
    icon: githubIcon,
    comp: (
      <>
        <UnorderedList color="#dbdbdb">
          <ListItem>Actions</ListItem>
          <ListItem>Relase</ListItem>
          <ListItem>Merge</ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    text: "Docker",
    icon: DockerIcon,
    comp: (
      <>
        <UnorderedList color="#dbdbdb">
          <ListItem>Dockerfile</ListItem>
          <ListItem>Docker-config</ListItem>
          <ListItem>Docker-Hub</ListItem>
          <ListItem>Docker Registry</ListItem>
          <ListItem>Volumes</ListItem>
          <ListItem>Kubernetes</ListItem>
          <ListItem>Environments</ListItem>
          <ListItem>Networks</ListItem>
        </UnorderedList>
      </>
    ),
  },
  { text: "postman", icon: postmanIcon, comp: (
    <>
      <UnorderedList color="#dbdbdb">
        <ListItem>API Development and Testing</ListItem>
        <ListItem>Request Building:</ListItem>
        <ListItem>Collections</ListItem>
        <ListItem>Environments and Variables</ListItem>
        <ListItem>Test Automation</ListItem>
      </UnorderedList>
    </>
  ), },
]

export const languageData = [
  {
    text: "Python",
    icon: PythonIcon,
    comp: (
      <>
        <UnorderedList color="#dbdbdb">
          <ListItem>ORM</ListItem>
          <ListItem>NumPy</ListItem>

          <ListItem>Celery</ListItem>
          <ListItem>Django</ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    text: "Javascript",
    icon: JavascriptIcon,
    comp: (
      <>
        {/* <Text
          // fontSize="4xl"
          // fontWeight="bold"
          color="green"
          textAlign="center"
          lineHeight="1.5"
          fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif">
          Related:
        </Text>
        <Text
          // fontSize="4xl"
          fontWeight="bold"
          color="white"
          textAlign="center"
          lineHeight="1.5"
          fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif">
          Typescript
        </Text> */}
        <UnorderedList color="#dbdbdb">
          <ListItem>React</ListItem>
          <ListItem>Redux</ListItem>
          <ListItem>Axios</ListItem>
          <ListItem>Apollo Client</ListItem>
          <ListItem>Chakra-Ui</ListItem>
          <ListItem>Material-Ui</ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    text: "html",
    icon: html5Icon,
    comp: (
      <>
        <UnorderedList color="#dbdbdb">
          <ListItem>Svg</ListItem>
          <ListItem>Canvas</ListItem>
          <ListItem>Forms</ListItem>
          <ListItem>Styles</ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    text: "CSS" ,
    icon: CssIcon,
    comp: (
      <>
        {" "}
        <UnorderedList color="#dbdbdb">
          <ListItem>Grid</ListItem>
          <ListItem>Sass</ListItem>
          <ListItem>Media</ListItem>
          <ListItem>@keyframes</ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    text: "golang",
    icon: golangIcon,
    comp: (
      <>
        {" "}
        <UnorderedList color="#dbdbdb">
          <ListItem>Gin Web Framework</ListItem>
        </UnorderedList>
      </>
    ),
  },
]
