# full-stack-dockerized
A dockerized full-stack app with React.js, axios, Express.js, Postgres and Prisma ORM

The preset names of the docker images are sample_api and sample_client, so make sure no other container uses such names in order to be able to build them and use them.

Run:
```
git clone https://github.com/Smytt/full-stack-dockerized.git
cd .\full-stack-dockerized\
docker-compose up
```

The app runs at http://localhost:5173
The service exposes 2 ports - 3000 for its APIs and 5555 for the Prisma Studio
The DB responds at 5432
