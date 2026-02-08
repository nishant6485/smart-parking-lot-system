import React, { useState,} from 'react';
import { Plus, Car, Zap, Home, X, CheckCircle2, AlertCircle } from 'lucide-react';

const ParkingLotSystem = () => {
  const [slots, setSlots] = useState([]);
  const [nextSlotNo, setNextSlotNo] = useState(1);
  const [activeTab, setActiveTab] = useState('park');
  const [notification, setNotification] = useState(null);
  
  // Form states
  const [newSlot, setNewSlot] = useState({
    isCovered: false,
    isEVCharging: false
  });
  
  const [parkingRequest, setParkingRequest] = useState({
    needsEV: false,
    needsCover: false
  });

  // Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Add new parking slot
  const addSlot = (e) => {
    e.preventDefault();
    const slot = {
      slotNo: nextSlotNo,
      isCovered: newSlot.isCovered,
      isEVCharging: newSlot.isEVCharging,
      isOccupied: false
    };
    
    setSlots([...slots, slot]);
    setNextSlotNo(nextSlotNo + 1);
    setNewSlot({ isCovered: false, isEVCharging: false });
    showNotification(`Slot #${slot.slotNo} created successfully`);
  };

  // Park vehicle - allocate nearest available matching slot
  const parkVehicle = (e) => {
    e.preventDefault();
    
    // Filter available slots that match requirements
    const availableSlots = slots.filter(slot => {
      if (slot.isOccupied) return false;
      if (parkingRequest.needsEV && !slot.isEVCharging) return false;
      if (parkingRequest.needsCover && !slot.isCovered) return false;
      return true;
    });

    if (availableSlots.length === 0) {
      showNotification('No slot available', 'error');
      return;
    }

    // Get the nearest slot (lowest slot number)
    const nearestSlot = availableSlots.reduce((nearest, slot) => 
      slot.slotNo < nearest.slotNo ? slot : nearest
    );

    // Update slot to occupied
    setSlots(slots.map(slot => 
      slot.slotNo === nearestSlot.slotNo 
        ? { ...slot, isOccupied: true }
        : slot
    ));

    showNotification(`Vehicle parked at Slot #${nearestSlot.slotNo}`);
    setParkingRequest({ needsEV: false, needsCover: false });
  };

  // Remove vehicle from slot
  const removeVehicle = (slotNo) => {
    setSlots(slots.map(slot => 
      slot.slotNo === slotNo 
        ? { ...slot, isOccupied: false }
        : slot
    ));
    showNotification(`Slot #${slotNo} is now available`);
  };

  // Calculate statistics
  const stats = {
    total: slots.length,
    occupied: slots.filter(s => s.isOccupied).length,
    available: slots.filter(s => !s.isOccupied).length,
    evCharging: slots.filter(s => s.isEVCharging && !s.isOccupied).length,
    covered: slots.filter(s => s.isCovered && !s.isOccupied).length
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      fontFamily: '"Space Mono", "Courier New", monospace',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background grid pattern */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: notification.type === 'error' ? '#ff3366' : '#00ff88',
          color: '#000',
          padding: '16px 24px',
          borderRadius: '0',
          border: '2px solid',
          borderColor: notification.type === 'error' ? '#ff0044' : '#00dd66',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1000,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '12px',
          letterSpacing: '1px',
          boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
          animation: 'slideIn 0.3s ease-out'
        }}>
          {notification.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          {notification.message}
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: 'bold',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #00ff88, #0088ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            SMART PARKING
          </h1>
          <div style={{
            height: '4px',
            width: '200px',
            background: 'linear-gradient(90deg, #00ff88, transparent)',
            marginBottom: '16px'
          }} />
          <p style={{
            fontSize: '14px',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: 0
          }}>
            Automated Allocation System
          </p>
        </div>

        {/* Stats Dashboard */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}>
          {[
            { label: 'Total Slots', value: stats.total, color: '#fff' },
            { label: 'Occupied', value: stats.occupied, color: '#ff3366' },
            { label: 'Available', value: stats.available, color: '#00ff88' },
            { label: 'EV Available', value: stats.evCharging, color: '#0088ff' },
            { label: 'Covered Available', value: stats.covered, color: '#ffaa00' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(255,255,255,0.1)',
              padding: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                background: stat.color
              }} />
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: stat.color,
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#888'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          borderBottom: '2px solid rgba(255,255,255,0.1)',
          paddingBottom: '0'
        }}>
          {[
            { id: 'park', label: 'Park Vehicle', icon: Car },
            { id: 'add', label: 'Add Slot', icon: Plus },
            { id: 'view', label: 'View All', icon: Home }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'rgba(0,255,136,0.1)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid #00ff88' : '3px solid transparent',
                  color: activeTab === tab.id ? '#00ff88' : '#888',
                  padding: '16px 24px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit'
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div style={{ minHeight: '400px' }}>
          {/* Park Vehicle Tab */}
          {activeTab === 'park' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px'
            }}>
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Park New Vehicle
                </h2>
                <form onSubmit={parkVehicle}>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      background: parkingRequest.needsEV ? 'rgba(0,136,255,0.1)' : 'rgba(255,255,255,0.05)',
                      border: '2px solid',
                      borderColor: parkingRequest.needsEV ? '#0088ff' : 'rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      marginBottom: '12px',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="checkbox"
                        checked={parkingRequest.needsEV}
                        onChange={(e) => setParkingRequest({...parkingRequest, needsEV: e.target.checked})}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                      <Zap size={20} color={parkingRequest.needsEV ? '#0088ff' : '#888'} />
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: parkingRequest.needsEV ? '#0088ff' : '#fff'
                      }}>
                        Needs EV Charging
                      </span>
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      background: parkingRequest.needsCover ? 'rgba(255,170,0,0.1)' : 'rgba(255,255,255,0.05)',
                      border: '2px solid',
                      borderColor: parkingRequest.needsCover ? '#ffaa00' : 'rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="checkbox"
                        checked={parkingRequest.needsCover}
                        onChange={(e) => setParkingRequest({...parkingRequest, needsCover: e.target.checked})}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                      <Home size={20} color={parkingRequest.needsCover ? '#ffaa00' : '#888'} />
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: parkingRequest.needsCover ? '#ffaa00' : '#fff'
                      }}>
                        Needs Cover
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      background: '#00ff88',
                      color: '#000',
                      border: '3px solid #00dd66',
                      padding: '16px 32px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      cursor: 'pointer',
                      boxShadow: '4px 4px 0 rgba(0,255,136,0.3)',
                      transition: 'all 0.2s',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translate(-2px, -2px)';
                      e.target.style.boxShadow = '6px 6px 0 rgba(0,255,136,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translate(0, 0)';
                      e.target.style.boxShadow = '4px 4px 0 rgba(0,255,136,0.3)';
                    }}
                  >
                    Allocate Slot
                  </button>
                </form>
              </div>

              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#888'
                }}>
                  Allocation Logic
                </h3>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  padding: '20px',
                  fontSize: '13px',
                  lineHeight: '1.8',
                  color: '#aaa'
                }}>
                  <p style={{ margin: '0 0 12px 0' }}>
                    → Filters available (non-occupied) slots
                  </p>
                  <p style={{ margin: '0 0 12px 0' }}>
                    → Matches EV charging requirement if needed
                  </p>
                  <p style={{ margin: '0 0 12px 0' }}>
                    → Matches covered parking if needed
                  </p>
                  <p style={{ margin: '0' }}>
                    → Selects nearest slot (lowest number)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Add Slot Tab */}
          {activeTab === 'add' && (
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Create New Slot
              </h2>
              <form onSubmit={addSlot}>
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  padding: '32px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#00ff88',
                    marginBottom: '8px'
                  }}>
                    #{nextSlotNo}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#888',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '32px'
                  }}>
                    Next Available Slot Number
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      background: newSlot.isEVCharging ? 'rgba(0,136,255,0.1)' : 'transparent',
                      border: '2px solid',
                      borderColor: newSlot.isEVCharging ? '#0088ff' : 'rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      marginBottom: '12px',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="checkbox"
                        checked={newSlot.isEVCharging}
                        onChange={(e) => setNewSlot({...newSlot, isEVCharging: e.target.checked})}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                      <Zap size={20} color={newSlot.isEVCharging ? '#0088ff' : '#888'} />
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: newSlot.isEVCharging ? '#0088ff' : '#fff'
                      }}>
                        EV Charging Station
                      </span>
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      background: newSlot.isCovered ? 'rgba(255,170,0,0.1)' : 'transparent',
                      border: '2px solid',
                      borderColor: newSlot.isCovered ? '#ffaa00' : 'rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="checkbox"
                        checked={newSlot.isCovered}
                        onChange={(e) => setNewSlot({...newSlot, isCovered: e.target.checked})}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                      <Home size={20} color={newSlot.isCovered ? '#ffaa00' : '#888'} />
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: newSlot.isCovered ? '#ffaa00' : '#fff'
                      }}>
                        Covered Parking
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#00ff88',
                    color: '#000',
                    border: '3px solid #00dd66',
                    padding: '16px 32px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0 rgba(0,255,136,0.3)',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translate(-2px, -2px)';
                    e.target.style.boxShadow = '6px 6px 0 rgba(0,255,136,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translate(0, 0)';
                    e.target.style.boxShadow = '4px 4px 0 rgba(0,255,136,0.3)';
                  }}
                >
                  Create Slot
                </button>
              </form>
            </div>
          )}

          {/* View All Tab */}
          {activeTab === 'view' && (
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                All Parking Slots ({slots.length})
              </h2>
              
              {slots.length === 0 ? (
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '2px dashed rgba(255,255,255,0.1)',
                  padding: '60px',
                  textAlign: 'center',
                  color: '#888'
                }}>
                  <Plus size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <div style={{
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    No slots created yet
                  </div>
                  <div style={{ fontSize: '12px', marginTop: '8px' }}>
                    Add your first parking slot to get started
                  </div>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '16px'
                }}>
                  {slots.map(slot => (
                    <div
                      key={slot.slotNo}
                      style={{
                        background: slot.isOccupied 
                          ? 'rgba(255,51,102,0.1)' 
                          : 'rgba(0,255,136,0.05)',
                        border: '2px solid',
                        borderColor: slot.isOccupied ? '#ff3366' : 'rgba(255,255,255,0.1)',
                        padding: '24px',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.2s'
                      }}
                    >
                      {/* Status indicator */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: slot.isOccupied ? '#ff3366' : '#00ff88'
                      }} />

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '16px'
                      }}>
                        <div>
                          <div style={{
                            fontSize: '32px',
                            fontWeight: 'bold',
                            color: slot.isOccupied ? '#ff3366' : '#00ff88',
                            lineHeight: 1
                          }}>
                            #{slot.slotNo}
                          </div>
                          <div style={{
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: '#888',
                            marginTop: '4px'
                          }}>
                            {slot.isOccupied ? 'OCCUPIED' : 'AVAILABLE'}
                          </div>
                        </div>
                        
                        {slot.isOccupied && (
                          <button
                            onClick={() => removeVehicle(slot.slotNo)}
                            style={{
                              background: 'rgba(255,51,102,0.2)',
                              border: '2px solid #ff3366',
                              color: '#ff3366',
                              padding: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s',
                              fontFamily: 'inherit'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = '#ff3366';
                              e.target.style.color = '#000';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'rgba(255,51,102,0.2)';
                              e.target.style.color = '#ff3366';
                            }}
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap'
                      }}>
                        {slot.isEVCharging && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            background: 'rgba(0,136,255,0.1)',
                            border: '1px solid #0088ff',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: '#0088ff'
                          }}>
                            <Zap size={12} />
                            EV
                          </div>
                        )}
                        {slot.isCovered && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            background: 'rgba(255,170,0,0.1)',
                            border: '1px solid #ffaa00',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: '#ffaa00'
                          }}>
                            <Home size={12} />
                            Covered
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default ParkingLotSystem;