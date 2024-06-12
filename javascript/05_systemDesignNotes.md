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

    - Performance vs scalability
    - ACID
    - CAP
    - AP
    - CP
    - Denormaliztion
    - Cache Types
    - Write Through Cache
    - Write Back Cache
    - Asynchronism structures - There are just queues
    - Message Queues
    - Task Queues
    - Back Pressure
    - HTTP/Hypertext transfer protocol -
    - TCP
    - UDP
    - RPC
    - REST
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
