Checklist endpoint POST /api/loan-calc/decision

| # | Test name | Test data | Expected status | Execution Status |
| 1 | Successful request with valid data | income: 1000, age: 25, debt: 0, loanPeriod: 12 | 200 OK |
| 2 | Positive response, Low Risk | income: 20000, age: 30, debt: 0, loanAmount: 500, loanPeriod: 12 | 200 OK |
| 3 | Positive response, Medium Risk | income: 20000, age: 30, debt: 0, loanAmount: 500, loanPeriod: 6 | 200 OK |
| 4 | Positive response, High Risk | income: 1000, age: 25, debt: 0, loanAmount: 1000, loanPeriod: 6 | 200 OK |
| 5 | Positive response: High Risk, periods 3,6 | riskLevel: "High Risk" | 200 OK |
| 6 | Positive response: Medium Risk, periods 6, 9, 12 | riskLevel: "Medium Risk" | 200 OK |
| 7 | Positive response: Low Risk, periods 12, 18, 24, 30, 36 | riskLevel: "Low Risk" | 200 OK |
| 8 | Invalid income (0) | income: 0 | 400 BAD REQUEST |
| 9 | Negative debt | debt: -100 | 400 BAD REQUEST |
| 10 | Invalid age (<16) | age: 15 | 400 BAD REQUEST |
| 11 | Negative loan amount | loanAmount: -500 | 400 BAD REQUEST |
| 12 | Invalid loan period (0 or -1) | loanPeriod: 0 | 400 BAD REQUEST |
| 13 | Income less than loan amount | income: 500, loanAmount: 1000 | 200 OK |
| 14 | Income equals loan amount, long loan period | income: 1000, loanAmount: 1000, loanPeriod: 60 | 200 OK |
| 15 | Empty "income" field | " " | 400 BAD REQUEST |
| 16 | Empty "debt" field | " " | 400 BAD REQUEST |
| 17 | Empty "age" field | " " | 400 BAD REQUEST |
| 18 | Empty "employed" field | " " | 400 BAD REQUEST |
| 19 | Empty "loanAmount" field | " " | 400 BAD REQUEST |
| 20 | Empty "loanPeriod" field | " " | 400 BAD REQUEST |
