export const initialBugs = [
    {
      id: '1',
      title: 'Login button not working on Safari',
      description: 'The login button is not responding to clicks when using Safari on macOS.',
      status: 'open',
      priority: 'high',
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-05-15T10:30:00Z',
      reportedBy: 'John Doe',
      steps: '1. Open the login page\n2. Enter credentials\n3. Click login button\n4. Nothing happens',
      environment: 'Safari 15.4 on macOS Monterey'
    },
    {
      id: '2',
      title: 'Incorrect calculation in total price',
      description: 'The shopping cart shows wrong total when adding multiple items.',
      status: 'in-progress',
      priority: 'critical',
      createdAt: '2023-05-14T14:25:00Z',
      updatedAt: '2023-05-16T09:30:00Z',
      reportedBy: 'Jane Smith',
      assignedTo: 'Alex Johnson',
      steps: '1. Add any product to cart\n2. Change quantity to 2 or more\n3. Observe total price',
      environment: 'All browsers and devices'
    },
    {
      id: '3',
      title: 'Profile image not uploading',
      description: 'Users cannot upload profile pictures on the settings page.',
      status: 'in-review',
      priority: 'medium',
      createdAt: '2023-05-12T09:15:00Z',
      updatedAt: '2023-05-17T11:20:00Z',
      reportedBy: 'Robert Brown',
      assignedTo: 'Sarah Williams',
      steps: '1. Go to profile settings\n2. Click "Change Avatar"\n3. Select an image\n4. Error appears',
      environment: 'Chrome 112 on Windows 11'
    },
    {
      id: '4',
      title: 'Email notifications not being sent',
      description: 'Users are not receiving email notifications for new messages.',
      status: 'resolved',
      priority: 'high',
      createdAt: '2023-05-10T16:45:00Z',
      updatedAt: '2023-05-18T14:30:00Z',
      reportedBy: 'Emily Davis',
      assignedTo: 'Michael Wilson',
      steps: '1. Send a message to any user\n2. Check email inbox\n3. No notification received',
      environment: 'Production environment, all users affected'
    },
    {
      id: '5',
      title: 'Sidebar menu disappears on smaller screens',
      description: 'The navigation sidebar is not visible when browser width is less than 768px.',
      status: 'open',
      priority: 'low',
      createdAt: '2023-05-16T13:10:00Z',
      updatedAt: '2023-05-16T13:10:00Z',
      reportedBy: 'Thomas Miller',
      steps: '1. Open application\n2. Resize browser to width < 768px\n3. Sidebar disappears without toggle option',
      environment: 'All browsers on desktop devices'
    }
  ];
  