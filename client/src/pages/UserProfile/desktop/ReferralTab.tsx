import { Grid, Typography, Button } from "@mui/material";
import QRCode from 'qrcode.react';
import LinkIcon from '@mui/icons-material/Link';
import { useRef } from "react";
import { toPng } from 'html-to-image';

export const ReferralTab = (props: any) => {
  const {
    authInfo,
    referralCodeForSA,
    referralCodeForMA,
    referralCodeForAgent,
    copyReferralLink,
    generateCode,
  } = props;
  const qrRefSA = useRef(null);
  const qrRefMA = useRef(null);
  const qrRefA = useRef(null);

  const downloadQRCode = (type: any) => {
    let fileName = 'qr-code.png';
    let qrElement = null;
    if(type === "SA"){
      fileName = 'qrcode-for-masteragents.png'
      qrElement = qrRefSA.current;
    }else if(type === "MA"){
      fileName = 'qrcode-for-agents.png'
      qrElement = qrRefMA.current;
    }else if(type === "A"){
      fileName = 'qrcode-for-players.png'
      qrElement = qrRefA.current;
    }

    if (!qrElement) {
      console.error('QR Code element is not available.');
      return;
    }

    const options = {
      quality: 1.0,
      width: 150,
      height: 150
    };

    toPng(qrElement, options)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Could not generate image', error);
      });
  
  };

  if (referralCodeForSA || referralCodeForMA || referralCodeForAgent) {
    return (
      <>
        {referralCodeForSA && (
          <Grid container direction="column" px={2}>
            <Grid item>
              <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                Referral Code Master Agent
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                mt={1}
                gap={1}
              >
                <Grid item sx={{ display: "none" }}>
                  {/* Hidden QR code for downloading */}
                  <div ref={qrRefSA}>
                    <QRCode value={authInfo?.referralLinkForSA} size={150} />
                  </div>
                </Grid>
                <Grid item>
                  <QRCode value={authInfo?.referralLinkForSA} />
                </Grid>
                <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                >
                  <Grid item>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => downloadQRCode("SA")}
                    >
                      Download
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => copyReferralLink("SA")}
                    >
                      Copy
                    </Button>
                  </Grid>
                </Grid>
                 
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        {referralCodeForMA && (
          <Grid container direction="column" mt={2} px={2}>
            <Grid item>
              <Typography sx={{ textAlign:"center", fontSize: "12px", fontWeight: 600 }}>
                Referral Code for Sub Agent
              </Typography>
            </Grid>
            <Grid item mt={1}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                mt={1}
                gap={1}
              >
                <Grid item sx={{ display: "none" }}>
                  {/* Hidden QR code for downloading */}
                  <div ref={qrRefMA}>
                    <QRCode value={authInfo?.referralLinkForMA} size={150} />
                  </div>
                </Grid>
                <Grid item>
                  <QRCode value={authInfo?.referralLinkForMA} />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                  >
                    <Grid item>
                      <Button
                          variant="contained"
                          size="small"
                          onClick={() => downloadQRCode("MA")}
                      >
                        Download
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => copyReferralLink("MA")}
                      >
                        Copy
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        {referralCodeForAgent && (
          <Grid container direction="column" mt={2} px={2}>
            <Grid item>
              <Typography sx={{ textAlign:"center", fontSize: "12px", fontWeight: 600 }}>
                Referral Code for Players
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                mt={1}
                gap={1}
              >
                <Grid item sx={{ display: "none" }}>
                  {/* Hidden QR code for downloading */}
                  <div ref={qrRefA}>
                    <QRCode value={authInfo?.referralLinkForAgent} size={150} />
                  </div>
                </Grid>
                <Grid item>
                  <QRCode value={authInfo?.referralLinkForAgent} />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                  >
                    <Grid item>
                      <Button
                          variant="contained"
                          size="small"
                          onClick={() => downloadQRCode("A")}
                      >
                        Download
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => copyReferralLink("A")}
                      >
                        Copy
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* referralCodeForAgent */}
            </Grid>
          </Grid>
        )}
      </>
    );
  }
  return (
    <Grid container direction="column" px={2}>
      <Grid item>
        <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
          Referral Code
        </Typography>
      </Grid>
      <Grid item mt={1}>
        <Button variant="contained" size="small" onClick={() => generateCode()}>
          Generate Code
        </Button>
      </Grid>
    </Grid>
  );
};
