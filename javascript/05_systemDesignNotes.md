# System Design Notes

## Things to do in interview

1. Ask question about Requirments
   - reliablity
   - scale
   - #'s of reads vs writes
   - Availability vs Consistency (how upto date things need to be. Bank vs PhotoScroll)
   - Latency
2. Deterimine API calls needed for functionality
3. Begin High Level Design
   Common Routes:
   - Client -> DNS
   - Client -> CDN
   - Client -> CDN -> Object Store
   - Client -> Loadbalancer -> Webserver -> Write APIs -> Object Store
   - Client -> Loadbalancer -> Webserver -> Write Async APIs -> Queue -> Worker Service -> SQL/NoSQL/ObjectStore DB
   - Client -> Loadbalancer -> Webserver -> Read/Write/Query APIs -> SQL/NoSQL DB -> Sharding/Federation
   - Client -> Loadbalancer -> Webserver -> Read/Write/Query APIs -> Memory Cache
     Other Notes:
   - SQL/NoSQL DB == [SQL Write Masters] + [SQL Read Slaves]
4. Go into protocols:
   - HTTP/Hypertext transfer protocol -
   - TCP
   - UDP
   - RPC
   - REST
   - WebHooks
   - Websocket
5. Looks at app security

## Glossary

   - Performance vs scalability - If you have a performance problem, your system is slow for a single user. If you have a scalability problem, your system is fast for a single user but slow under heavy load.
   - Latency vs throughput - Latency is the time to perform some action or to produce some result. Throughput is the number of such actions or results per unit of time. Generally, you should aim for maximal throughput with acceptable latency.
   - CAP - **Consistency** - Every read receives the most recent write or an error **Availability** - Every request receives a response, without guarantee that it contains the most recent version of the information **Partition Tolerance** - The system continues to operate despite arbitrary partitioning due to network failures
   - AP - Perfered if you can tolerate data being out of sync for some amount of time and can be eventually consistent
   - CP - Best if you need atomic reads and writes
   - Weak consistency - After a write, reads may or may not see it. A best effort approach is taken. Seen in MemCached/streaming type systems.
   - Eventual Consistency - After a write, reads will eventually see it (typically within milliseconds). Data is replicated asynchronously. Seen in DNS/Email
   - Strong consistency - After a write, reads will see it. Data is replicated synchronously. This approach is seen in file systems and RDBMSes. Strong consistency works well in systems that need transactions.
   - Failover - Active-passive AKA Master-Slave - With active-passive fail-over, heartbeats are sent between the active and the passive server on standby. If the heartbeat is interrupted, the passive server takes over the active's IP address and resumes service.
   - Failover - Active-active AKA Master-Master - In active-active, both servers are managing traffic, spreading the load between them.
   - Replication - creating or maintaining multiple copies of something -- generally your database, but possibly more, such an an image of your entire server.
   - Failover - when one system detects that another has failed, and responds by taking over its duties.
   - DNS - translates a domain name such as www.example.com to an IP address
   - CDN - Generally, static files such as HTML/CSS/JS, photos, and videos are served from CDN, although some CDNs such as Amazon's CloudFront support dynamic content
   - Push CDNs - Push CDNs receive new content whenever changes occur on your server. You take full responsibility for providing content, uploading directly to the CDN and rewriting URLs to point to the CDN.
   - Pull CDNs - Pull CDNs grab new content from your server when the first user requests the content. First request wil be slow. Second request will be cached.
   - time-to-live (TTL)  - determines how long content is cached
   - Load balancers - distribute incoming client requests to computing resources such as application servers and databases.
   - Layer 4 load balancing - Look at transport layer to distribute requests. Generally, this involves the source, destination IP addresses, and ports in the header, but not the contents of the packet
   - Layer 7 load balancing - Look at the application layer to distribute requests. This can involve contents of the header, message, and cookies.
   - Horizontal scaling - Can clone hardware to scale up. The type of scaling load balancers can do
   - Vertical Scaling - Need faster hardware to do this.
   - Reverse proxy - Provides unified interfaces to the public. Acts similar to a Load Balancer but is not balancing load instead acts as a "mask" for your system. Gives security, SSL termination, request compression, caching. Many time used together with a loadbalancer.
   - Microservices - a suite of independently deployable, small, modular services. Each service runs a unique process and communicates through a well-defined, lightweight mechanism to serve a business goal
   - ACID - **Atomicity** - Each transaction is all or nothing **Consistency** - Any transaction will bring the database from one valid state to another **Isolation** - Executing transactions concurrently has the same results as if the transactions were executed serially **Durability** - Once a transaction has been committed, it will remain so
   - Federation (or functional partitioning) - splits up databases by function. For example, instead of a single, monolithic database, you could have three databases: forums, users, and products, resulting in less read and write traffic to each database and therefore less replication lag.
   - Sharding - distributes data across different databases such that each database can only manage a subset of the data. (E.g. split Users A-Z into Users A-F and Users G-Z)
   - SQL tuning -  It's important to benchmark and profile to simulate and uncover bottlenecks. Large topic...
   - NoSQL DBs - are a collection of data items represented in a key-value store, document store, wide column store, or a graph database. Data is denormalized, and joins are generally done in the application code. Most NoSQL stores lack true ACID transactions and favor eventual consistency.


   - Denormaliztion - Duplicates data on tables to remove expensive joins but have keep larger tables in DB
   - Cache Types - Client - CDN - WebServer - Database - Application 
   - Write Through Cache - Write-through caching is a caching strategy in which the cache and database are updated almost simultaneously. When we want to update the information in the cache, we first update the cache itself, and then propagate the same update to the underlying database. Changes to the cache that have not yet been sent to the database are referred to as “dirty.” The use of write-through caching helps guarantee that your data is consistent between the cache and the database. Write-through caching is best when you expect to perform update operations relatively infrequently.
   - Write Back Cache - Write-behind caching is a caching strategy in which the cache is updated first, and then the database is updated after a set period of time. The use of write-behind caching is more convenient when you expect to have a write-heavy workload.
   - Asynchronism structures - There are just queues
   - Message Queues - Message queues receive, hold, and deliver messages
   - Task Queues - receive tasks and their related data, runs them, then delivers their results. 
   - Back Pressure - if queues fill up you can send clients a HTTP 503 status for "busy" to try later
   - HTTP/Hypertext transfer protocol - A basic HTTP request consists of a verb (method) and a resource (endpoint). Below are common HTTP verbs: GET/POST/PUT/PATCH/DELETE. HTTP is an application layer protocol relying on lower-level protocols such as TCP and UDP.
   - TCP - is a connection-oriented protocol over an IP network. Connection is established and terminated using a handshake. All packets sent are guaranteed to reach the destination in the original order and without corruption through:
   - UDP - is connectionless. Datagrams (analogous to packets) are guaranteed only at the datagram level. Datagrams might reach their destination out of order or not at all. UDP does not support congestion control. Without the guarantees that TCP support, UDP is fast if you can tolerate data loss.
   - RPC - (Uses HTTP and TCP to work) In an RPC, a client causes a procedure to execute on a different address space, usually a remote server. The procedure is coded as if it were a local procedure call, abstracting away the details of how to communicate with the server from the client program. Remote calls are usually slower and less reliable than local calls so it is helpful to distinguish RPC calls from local calls. RPC syntax is all about the action/verb
   - REST - (Uses HTTP and TCP to work) is an architectural style enforcing a client/server model where the client acts on a set of resources managed by the server. The server provides a representation of resources and actions that can either manipulate or get a new representation of resources. All communication must be stateless and cacheable. Rest syntax is all about the resource
   - WebHooks
   - Websocket
   - Long Polling - HTTP or WebSocket request keeps the request open for an extended period until new data is available. Ensures realtime updates. HTTP better than websocket for one way infomation.

# Non-functional Requirments

reliablity
scale
#'s of reads vs writes
Availability vs Consistency (how upto date things need to be. Bank vs PhotoScroll)
Latency

# High-level design

Uploads vs Downloads (reads vs writes)
Loadbalancers abstracted away
Object store vs
object storage (aws s3, googl cloud storage ---- Usually made up of ID, Metadata, Data) vs file storage (files are in directories) vs block storage (Used by db: sql/non-sql) vs document store?
What do we want to store?
Whay type of db?
(Nosql can have duplicate data to save on joins)
Encoding/Compression (Files) -- How many workers we need to do this task per sec?
How many locations do we want this service (Geo's that we support)
On reads do we give lower res files? Smaller chunks of files?
Do we need caching to make common operations eaiser?(LRU,MRU...)
CDN will actaully get info from object storage

# Design Details

# Protocols

UDP (livestream - data is lost) vs TCP (Reliabiliy)
Ratelimit so users get what they need but not waist bandwith

Sharding
Read only replica?

Tips:
Ask good quesitons from the interview? Features? How much to scale?
Buzzwords backfire.
Think clear thiking (actors and protocals of the system)
Drive the discussion

Features
Define APIs
Availability
latencey and performance
scaleability
durability
class diagram
security and privacy
cost effective

Step 1: Outline use cases, constraints, and assumptions

- who, what, when, where why, how many.

Step 2: Create a high level design

- Sketch the main components and connections

Step 3: Design core components

- List out core functionality/how to do it

Step 4: Scale the design

- Load balancer
- Horizontal scaling
- Caching
- Database sharding

Performance vs scalability

- Performance problem for single user
- scalability problem if slow for single user when system is loaded with multi-user

Latency vs throughput

- Latency is time for one action to result in value
- Throughput is number of action per unit of time

Availability vs consistency

- CAP - Consistency/Avaliability/Partition Tolerance - Can only support 2
- Consistency means that data is the same across the cluster, so you can read or write from/to any node and get the same data.
- Availability means the ability to access the cluster even if a node in the cluster goes down.
- Partition tolerance means that the cluster continues to function even if there is a "partition" (communication break) between two nodes (both nodes are up, but can't communicate).

- CA - data is consistent between all nodes - as long as all nodes are online - and you can read/write from any node and be sure that the data is the same, but if you ever develop a partition between nodes, the data will be out of sync (and won't re-sync once the partition is resolved).
- CP - data is consistent between all nodes, and maintains partition tolerance (preventing data desync) by becoming unavailable when a node goes down.
- AP - nodes remain online even if they can't communicate with each other and will resync data once the partition is resolved, but you aren't guaranteed that all nodes will have the same data (either during or after the partition)
