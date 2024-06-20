# Requirements
## MUST (12 points)
- [x] M1: The backend (BE) of the system must be an individual component.
- [x] M2: The frontend (FE) of the system must be an individual component implemented using HTML5, CSS and JS.
- [ ] M3: The communication between FE and BE components must be implemented using HTTP(S).
- [ ] M4: The communication between FE and BE components must be implemented using asynchronous data transfer (AJAX).
- [ ] M5: The HTTP endpoints of the BE component must return the data either as JSON or as XML.
- [ ] M6: The HTTP endpoints of the BE component must manage resources using HTTP methods GET, POST, PUT and DELETE, each method at least on one HTTP endpoint.
- [ ] M7: The HTTP endpoints of the FE component must consume resources using HTTP methods GET, POST, PUT and DELETE from at least one HTTP endpoint.
- [ ] M8: The system must consume at least one external REST web service.
- [ ] M9: The system must implement session management (Login, sessionID, JWT, ...).
## SHOULD (5 points)
- [ ] S1: The system should consume a least two external REST web services.
- [ ] S2: The system should offer a second individual FE component that communicates with at least three HTTP endpoints of the BE component.
- [ ] S3: The FE component should be designed in a way that it is w3c compliant (https://validator.w3.org/).
- [ ] S4: The FE component should be responsive in a way that it has a dedicated view for mobile and desktop screens.
## COULD (3 points)
- [ ] C1: The system could consume a least three external REST web services.
- [ ] C2: The HTTP endpoints of the BE component could return the data as JSON and XML.
- [ ] C3: The BE component of the system could provide a PATCH HTTP endpoint, which is consumed by the FE component.