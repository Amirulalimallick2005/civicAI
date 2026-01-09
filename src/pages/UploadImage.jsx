import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EXIF from 'exif-js';
import { ArrowLeft, Camera, Upload, X, Zap, MapPin, Loader2 } from 'lucide-react';

const UploadImage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState(null);

  // --- CLEAN HANDLER: SENDS DATA TO YOUR FRIEND'S BACKEND ---
 const handleAIAnalysis = async () => {
  if (!capturedImage) return;
  setIsLocating(true); 

  try {
    const base64Response = await fetch(capturedImage);
    const blob = await base64Response.blob();
    
    const formData = new FormData();
    // "file" must match the variable name in your FastAPI: async def detect(file: ...)
    formData.append("file", blob, "report.jpg"); 
    formData.append("latitude", locationDetails?.lat || 0);
    formData.append("longitude", locationDetails?.lng || 0);
    formData.append("address", locationDetails?.address || "Unknown");

    const response = await fetch("http://127.0.0.1:8000/detect", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("AI Server Error");

    const data = await response.json();

    // Navigate to results page with the AI's answer
    navigate("/analysis-result", {
      state: {
        image: capturedImage,
        predictions: {
          label: data.class,
          confidence: data.confidence
        },
        location: locationDetails
      }
    });

  } catch (err) {
    alert("Connection Error: " + err.message);
  } finally {
    setIsLocating(false);
  }
};

  // --- LOCATION UTILITIES (KEEP THESE, THEY ARE IMPORTANT) ---
  const convertDMSToDD = (degrees, minutes, seconds, direction) => {
    let dd = degrees + minutes / 60 + seconds / (60 * 60);
    if (direction === "S" || direction === "W") dd = dd * -1;
    return dd;
  };

  const getAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name;
    } catch (err) {
      return "Address details unavailable";
    }
  };

  const fetchIPLocation = async () => {
    setIsLocating(true);
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      if (data.latitude && data.longitude) {
        const address = await getAddress(data.latitude, data.longitude);
        setLocationDetails({
          lat: data.latitude,
          lng: data.longitude,
          address: address + " (Network Traced)",
          timestamp: new Date().toLocaleString() + " (IP Fallback)"
        });
      }
    } catch (err) {
      setError("Unable to trace location.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLocating(true);
    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      setCapturedImage(event.target.result);
    };
    reader.readAsDataURL(file);
    EXIF.getData(file, async function() {
      const lat = EXIF.getTag(this, "GPSLatitude");
      const lng = EXIF.getTag(this, "GPSLongitude");
      const latRef = EXIF.getTag(this, "GPSLatitudeRef");
      const lngRef = EXIF.getTag(this, "GPSLongitudeRef");
      if (lat && lng) {
        const latitude = convertDMSToDD(lat[0], lat[1], lat[2], latRef);
        const longitude = convertDMSToDD(lng[0], lng[1], lng[2], lngRef);
        const address = await getAddress(latitude, longitude);
        setLocationDetails({
          lat: latitude,
          lng: longitude,
          address: address,
          timestamp: new Date().toLocaleString() + " (From Image GPS)"
        });
        setIsLocating(false);
      } else {
        fetchIPLocation();
      }
    });
  };

  const startCamera = async () => {
    setError(null);
    setIsLocating(true);
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const address = await getAddress(latitude, longitude);
            setLocationDetails({
              lat: latitude,
              lng: longitude,
              address: address,
              timestamp: new Date().toLocaleString()
            });
            setIsLocating(false);
          },
          (err) => {
            setError("Location access denied. Please enable GPS.");
            setIsLocating(false);
          }
        );
      }
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" }, 
        audio: false 
      });
      setIsCameraOpen(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 300);
    } catch (err) {
      setError("Camera access denied.");
      setIsLocating(false);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(dataURL);
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #f1f5f9', height: '80px', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#2563eb', color: 'white', padding: '8px 12px', borderRadius: '10px', fontWeight: '800' }}>CA</div>
            <span style={{ fontSize: '22px', fontWeight: '700' }}>CivicAI</span>
          </div>
      </nav>

      <main style={{ padding: '40px 24px', maxWidth: '850px', margin: '0 auto' }}>
        <div onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <ArrowLeft size={18} /> Back to Home
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          {capturedImage ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <img src={capturedImage} alt="Captured" style={{ width: '100%', display: 'block' }} />
                
                <div style={{ 
                  position: 'absolute', bottom: 0, left: 0, right: 0, 
                  background: 'rgba(15, 23, 42, 0.85)', color: 'white', 
                  padding: '16px', textAlign: 'left', fontSize: '13px',
                  backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <MapPin size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '11px', color: '#93c5fd', marginBottom: '4px' }}>LOCATION VERIFIED</div>
                      <div style={{ fontWeight: '500', lineHeight: '1.4', marginBottom: '6px' }}>{locationDetails?.address || "Fetching location..."}</div>
                      <div style={{ display: 'flex', gap: '15px', opacity: 0.8, fontSize: '11px', fontFamily: 'monospace' }}>
                        <span>LAT: {locationDetails?.lat?.toFixed(6) || "0.00"}</span>
                        <span>LNG: {locationDetails?.lng?.toFixed(6) || "0.00"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button onClick={() => {setCapturedImage(null); setLocationDetails(null);}} style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: '700', cursor: 'pointer' }}>Retake</button>
                <button 
                  onClick={handleAIAnalysis} 
                  disabled={isLocating}
                  style={{ flex: 2, padding: '16px', borderRadius: '12px', background: '#2563eb', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  {isLocating ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : "Submit Report"}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
               <div onClick={startCamera} style={{ display: 'inline-flex', background: '#eff6ff', padding: '24px', borderRadius: '30px', color: '#2563eb', marginBottom: '24px', cursor: 'pointer' }}>
                {isLocating ? <Loader2 size={40} className="animate-spin" /> : <Camera size={40} />}
              </div>
              <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Report an Issue</h1>
              <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '40px' }}>Capture a photo or upload from gallery to start.</p>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />

              <div 
                onClick={() => fileInputRef.current.click()} 
                style={{ border: '2px dashed #cbd5e1', borderRadius: '20px', padding: '60px 20px', background: '#f8fafc', cursor: 'pointer' }}
              >
                <Upload size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#334155' }}>Upload from Gallery</h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}>We will detect location from photo metadata.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CAMERA OVERLAY */}
      {isCameraOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'black', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', color: 'white' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600' }}>
               <Zap size={18} fill="#eab308" color="#eab308" /> LIVE GEOTAGGING
             </div>
             <X onClick={stopCamera} style={{ cursor: 'pointer' }} />
          </div>

          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ height: '180px', background: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <button 
              onClick={takePhoto}
              disabled={isLocating}
              style={{ width: '80px', height: '80px', borderRadius: '50%', border: '6px solid rgba(255,255,255,0.3)', background: 'white', cursor: 'pointer' }}
            >
                <div style={{ width: '60px', height: '60px', margin: '4px auto', borderRadius: '50%', border: '2px solid black' }}></div>
            </button>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: '600', opacity: 0.7 }}>TAP TO CAPTURE</span>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default UploadImage;