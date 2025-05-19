
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPlayers, mockEvents } from '@/data/mockData';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You need to be logged in to view this page.</p>
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const renderRoleDashboard = () => {
    switch (user.role) {
      case 'player':
        return <PlayerDashboard />;
      case 'coach':
      case 'manager':
        return <CoachDashboard />;
      case 'agent':
        return <AgentDashboard />;
      case 'club_staff':
        return <ClubDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <GenericDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user.name}</p>
        </div>
        
        {renderRoleDashboard()}
      </div>
    </div>
  );
};

const PlayerDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Profile Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-gray-500 mt-1">+22% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Club Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-gray-500 mt-1">2 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Trial Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500 mt-1">Respond within 7 days</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Trials & Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.slice(0, 3).map(event => (
                <div key={event.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{event.title}</h4>
                    <span className="text-sm bg-nigerian-green-100 text-nigerian-green-800 px-2 py-0.5 rounded-full capitalize">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{event.date} • {event.location}</p>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4">View All Events</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="stat-card">
                <div className="text-sm text-gray-500 mb-1">Pace</div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-nigerian-green-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="text-right text-sm mt-1">85/100</div>
              </div>
              <div className="stat-card">
                <div className="text-sm text-gray-500 mb-1">Shooting</div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-nigerian-green-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="text-right text-sm mt-1">78/100</div>
              </div>
              <div className="stat-card">
                <div className="text-sm text-gray-500 mb-1">Passing</div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-nigerian-green-500 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <div className="text-right text-sm mt-1">82/100</div>
              </div>
              <div className="stat-card">
                <div className="text-sm text-gray-500 mb-1">Dribbling</div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-nigerian-green-500 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <div className="text-right text-sm mt-1">90/100</div>
              </div>
              <div className="stat-card">
                <div className="text-sm text-gray-500 mb-1">Defending</div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-nigerian-green-500 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <div className="text-right text-sm mt-1">70/100</div>
              </div>
              <div className="stat-card">
                <div className="text-sm text-gray-500 mb-1">Physical</div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-nigerian-green-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="text-right text-sm mt-1">75/100</div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">Update Stats</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CoachDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Scouted Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500 mt-1">5 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Shortlisted Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500 mt-1">3 pending response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Trials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500 mt-1">Next on June 15</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recently Viewed Players</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockPlayers.slice(0, 5).map((player) => (
                  <tr key={player.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={player.image} alt={player.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900 dark:text-gray-100">{player.name}</div>
                          <div className="text-sm text-gray-500">{player.nationality}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{player.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{player.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${player.availableForTransfer ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {player.availableForTransfer ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Button variant="ghost" className="text-nigerian-green-500 hover:text-nigerian-green-600">View</Button>
                      <Button variant="ghost" className="text-nigerian-green-500 hover:text-nigerian-green-600">Shortlist</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AgentDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">My Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500 mt-1">2 with contract negotiations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Open Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500 mt-1">3 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Transfer Market Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€1.2M</div>
            <p className="text-xs text-gray-500 mt-1">Total value of all clients</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Client Transfer Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPlayers.slice(0, 3).map((player) => (
                <div key={player.id} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={player.image} alt={player.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{player.name}</div>
                      <div className="text-sm text-gray-500">{player.position}, {player.age} years</div>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${player.availableForTransfer ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {player.availableForTransfer ? 'Looking for Club' : 'In Negotiations'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Latest Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <div className="flex justify-between">
                  <h4 className="font-semibold">Left-Back Position</h4>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Trial</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Lagos City FC • 3 days ago</p>
                <p className="text-sm mt-2">Looking for a left-back U-23 with good crossing ability...</p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <div className="flex justify-between">
                  <h4 className="font-semibold">Striker Position</h4>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Transfer</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Delta Force FC • 5 days ago</p>
                <p className="text-sm mt-2">Seeking experienced striker with proven goal-scoring record...</p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <div className="flex justify-between">
                  <h4 className="font-semibold">Youth Academy Trials</h4>
                  <span className="text-sm bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">Youth</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Rising Stars Academy • 1 week ago</p>
                <p className="text-sm mt-2">Open trials for talented players aged 14-17...</p>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">View All Opportunities</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ClubDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Recruitment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500 mt-1">Positions currently open</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Scouted Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-gray-500 mt-1">7 shortlisted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Trials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-gray-500 mt-1">June 20th, National Stadium</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Current Recruitment Needs</CardTitle>
          <Button className="bg-nigerian-green-500 hover:bg-nigerian-green-600">Add Position</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Central Defender</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Experienced center-back, good in the air, leadership qualities
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="mr-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">Age: 23-28</span>
                    <span className="mr-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">Height: 185cm+</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">View Applications (3)</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Attacking Midfielder</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Creative playmaker with good dribbling and vision
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="mr-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">Age: U-23</span>
                    <span className="mr-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">Position: CAM/LW</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">View Applications (7)</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Goalkeeper</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Reliable goalkeeper with good distribution and commanding presence
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="mr-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">Age: 22-30</span>
                    <span className="mr-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">Height: 188cm+</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">View Applications (2)</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">542</div>
            <p className="text-xs text-gray-500 mt-1">+48 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦856,400</div>
            <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">312</div>
            <p className="text-xs text-gray-500 mt-1">78% profile completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Clubs & Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94</div>
            <p className="text-xs text-gray-500 mt-1">23 with active recruitments</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Registration Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
              <p className="text-gray-500">Chart: Monthly user registrations</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
              <div className="text-center">
                <p className="text-gray-500">Chart: User role distribution</p>
                <div className="flex justify-center gap-4 mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-nigerian-green-500 rounded-full mr-1"></div>
                    <span>Players (60%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                    <span>Coaches (15%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                    <span>Agents (12%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                    <span>Clubs (13%)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">5 new users registered</p>
                <p className="text-xs text-gray-500">3 players, 1 coach, 1 agent</p>
              </div>
              <div className="text-xs text-gray-500">2 hours ago</div>
            </div>
            
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex-shrink-0 p-2 bg-green-100 rounded-full">
                <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">New subscription payments</p>
                <p className="text-xs text-gray-500">3 premium plans activated</p>
              </div>
              <div className="text-xs text-gray-500">5 hours ago</div>
            </div>
            
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex-shrink-0 p-2 bg-amber-100 rounded-full">
                <svg className="h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">New event published</p>
                <p className="text-xs text-gray-500">Lagos Youth Talent Trial by Lagos State FA</p>
              </div>
              <div className="text-xs text-gray-500">12 hours ago</div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 p-2 bg-red-100 rounded-full">
                <svg className="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">3 profile verification requests</p>
                <p className="text-xs text-gray-500">Pending administrator approval</p>
              </div>
              <div className="text-xs text-gray-500">1 day ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const GenericDashboard = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
        <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h2 className="text-xl font-semibold mb-2">Dashboard setup incomplete</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Please complete your profile setup to access your personalized dashboard.
      </p>
      <Button className="bg-nigerian-green-500 hover:bg-nigerian-green-600">
        Complete Your Profile
      </Button>
    </div>
  );
};

export default DashboardPage;
