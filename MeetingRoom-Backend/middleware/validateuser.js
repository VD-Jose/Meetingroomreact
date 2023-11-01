function authenticateEmployee(req, res, next) {
    const employeeId = req.params.employeeId;
    if (!employeeId) {
      return res.status(401).json({ message: 'Employee ID is required' });
    }
  // Find the employee by ID in the MongoDB collection
    db.collection('employeedetails').findOne({ id: employeeId }, (err, employee) => {
      if (err) {
        console.error('Database query error: ' + err);
        client.close();
        return res.status(500).json({ message: 'Database error' });
      }
     if (!employee) {
        client.close();
        return res.status(401).json({ message: 'Invalid Employee ID' });
      }
      // Attach the authenticated employee to the request for later use
      req.employee = employee;
      // If authentication is successful, proceed to the next middleware
      next();
    });
  }
// Example route that uses the authentication middleware
app.get('/bookforms/:employeeID', authenticateEmployee, (req, res) => {
res.json({ message: 'Authenticated', employee: req.employee });
 client.close();
 });