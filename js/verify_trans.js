(async () => {
    //Get the txnref from the location object
    //var txn_ref = window.location;
    var regex = /\=(.*?)\&/;
    var strToMatch = window.location.href;
    var txn_refs = regex.exec(strToMatch);

    swal
      .fire({
        title: "Please wait",
        text: "Your transaction is being verified",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 3000,
      })
      .then(async () => {
        console.log("Done with this ", txn_refs[1]);
        // create request object
        swal.fire({
          title: "Please wait",
          text: "Verifying your payment transaction",
          icon: "info",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        const m_token = localStorage.getItem("access_token");
        var userObj = parseJwt(localStorage.getItem("access_token"));
        let payment_info = {
          trxref: txn_refs[1],
          user_id: userObj.user.id,
        };
        var verify_request = new Request(
          'https://farm-aid-backend.herokuapp.com/api/topup/paystack_verify',
          {
            method: 'POST',
            body: JSON.stringify(payment_info),
            headers: new Headers({
              'Content-Type': 'application/json',
              'authorization': m_token,
            }),
          }
        );

        // pass request object to `fetch()`
        fetch(verify_request)
          .then(async (some) => {
            swal.close();
            let final_out = await some.json();
            console.table(final_out);
            swal.fire({
                title: 'Completing Topup transaction',
                text: 'Your payment has been verified and added to your wallet!',
                timer: 3000,
                icon: 'success'
                }).then(() => {
                    window.location.assign('https://www.farmaid.net/partnerDashboard.html');
                })
          })
          .catch((err) => {
            swal.close();
            console.log("There was a problem: ", err);
          });
      });
  }
)();