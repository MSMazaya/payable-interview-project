import puppeteer from 'puppeteer';
import Tesseract from 'tesseract.js';
import moment from 'moment';
import md5 from 'md5';

const html = `
<div class="column column-1" role="main">














<!-- Portal Changes Start--------( Simant_Verma )  -->



<!-- Portal Changes End--------( Simant_Verma )  -->


  
  
  
  
  
  
  
  
  <div class="section" id="BrdCrumbNImg">
    
      
        
          
            
              <p><a name="skiptomaincontent"></a><span class="bcum">
<span class="bcum-bold" id="moduleTopBar13558604">REKENING: <span id="HREF_BrdCrmb1">
	Informasi Saldo &amp; Mutasi &gt; </span></span><a href="Finacle;jsessionid=0000J59FreL0IbCVJWP8zqjgpV6:19u1bqbka?bwayparam=fA8DF6kw5C728Uywz%2FtnuZv%2BbbDAmWjo5b9aM%2FXqkmzL%2FnAvj0naFs0JNHODUYbai6Q9G0szCdi8%0D%0AIkt8Bm45S%2Bqc6XgTNpY3HKtnnuS2AMGfF%2FT7kz7ILzMko8w6IZO7AkealrX4nAMbBDNgP6vJKco%2FOdU2%0D%0AXvuU6964Am%2BcgIbsmEFP49Lz4r5lWcolPoNAKe2w1ivU9qWxoPQhLPdX3cnlrWKq2lXLmdGU6OtnaaI%3D" id="HREF_BrdCrmb2" name="HREF_BrdCrmb2" class="bcum-Ulined">Saldo Rekening</a> &gt; Histori Transaksi</span><a href="Finacle;jsessionid=0000J59FreL0IbCVJWP8zqjgpV6:19u1bqbka?bwayparam=cvQSQOKhuj1y5Dd2tz3xlQjB7X5OCC6KZAiN0f3HD2%2Fjg474VdSXbrGHyhKNUl8SiVq1%2BuLllygb%0D%0AWt77LqRM5ARViAPWMeHUe0Mlm8VX4EdEVAxpcp5MzNCFpiY%2FmlNf%2B%2BvAjJkQ6EJ%2FBH0K1nKgzcnlrWKq%0D%0A2lXLmdGU6OtnaaI%3D" id="HREF_printPreview" name="HREFprintPreview" data-isexcluded="true" onclick="window.open(this.href,'','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,width=640,height=660 left=200 top=25,resizable=1'); return false;" target="new "><img src="L002/consumer/images/btn-print.gif" alt="Cetak halaman utama" title="Cetak halaman utama" id="printpreview" border="0"></a></p>
            
          
        
      
    
  </div>

  <div class="section" id="PgHeading">
    
      
        
          
            
              
            
            
              
            
            
              
                
                
                
              
            
          <div id="PgHeading.Ra1">
<span id="PgHeading.Ra1.C1" class="width10"><img src="L002/consumer/images/arrow-pageheading.gif?mtime=1359105366000" alt="Gambar Panah" title="Gambar Panah" id="arrowImage" border="0"></span><div id="PgHeading.Ra1.C2" class="pageheadingcaps"><h1>Histori Transaksi</h1></div></div> 
        
      
    
  </div>

  <div id="MessageDisplay_TABLE" class="section"><div class="width100percent"><p class="redbgwithwidth"><span class="redtopleft"><span></span></span><span class="redbg"><span></span></span><span class="redtopright"> <span></span></span> </p></div><div role="alert" class="redbg"> <a href="#" id="errorlink1"><img src="L002/consumer/images/error-icon.gif		" alt="Anda telah 1KesalahanEmail" title="Anda telah 1KesalahanEmail" class="absmiddle"></a><span dir="ltr">[ESBRES001] [100130] </span>Tidak ada transaksi pada rekening dengan kriteria yang diberikan. Silahkan mengubah periode histori transaksi menggunakan Menu Kriteria Pencarian</div><div class="width100percent"><p class="redbgwithwidth"><span class="redbottomleft"> <span></span></span><span class="redbg"> <span></span></span><span class="redbottomright"> <span></span></span> </p></div></div>
  <div class="section_blackborder" id="SearchPanel">
    
      <!--start of subsection--><div id="SearchPanel.SubSection1" class="width100percent">
        <div class="width100percent" id="SearchPanel.Rowset1">
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
        </div>

      </div>
<!--end of subsection-->
      <!--start of subsection--><div id="SearchPanel.SubSection2" class="width100percent">
        
          
          
        <h3 class="subsectheader" id="SearchPanel.Header2"><a href="javascript:return false" name="HREF_null" class="collapsiblelink" onclick="return expandCollapse('SearchPanel.Header2','SearchPanel#SearchPanel.SubSection2','sectionCollapse','null');"><img src="L002/consumer/images/minus.gif" alt="Minus" border="0" title="Sembunyikan" id="SearchPanel.SubSection2.collapsibleImage"><span class="error_highlight" id="LabelForControl7047610">Kriteria Pencarian</span></a></h3> 

        <div class="width100percent" id="SearchPanel.Rowset2" style="">
          
            
              
            
            
              
            
          
          
            
              
                
                
              
            
            
              
            
          <p id="SearchPanel.Rb2" class="formrow">
<span id="SearchPanel.Rb2.C1" class="querytextleft"><font class="absmiddletxt"><input type="radio" name="TransactionHistoryFG.SELECTED_RADIO_INDEX" value="0" class="absmiddle" id="TransactionHistoryFG.SELECTED_RADIO_INDEX" title="Pilih Tanggal Awal Transaksi"></font><label for="TransactionHistoryFG.FROM_TXN_DATE" id="txnDateFromLabel" class="simpletext">Tanggal Awal<span style="direction: rtl; unicode-bidi: embed">(dd-MMM-yyyy)</span>:</label></span><span id="SearchPanel.Rb2.C2" class="querytextright"><span class="datelabelColumn"><span class="datelabelColumn_border"><input type="Text" name="TransactionHistoryFG.FROM_TXN_DATE" id="TransactionHistoryFG.FROM_TXN_DATE" maxlength="11" value="" data-febatype="FEBADate" class="datetextbox type_FEBADate">&nbsp;<a href="#" title="Kalender" name="HREF_TransactionHistoryFG.FROM_TXN_DATE" id="HREF_TransactionHistoryFG.FROM_TXN_DATE"><img src="L002/consumer/images/calenderEndUser.gif" alt="Kalender" id="TransactionHistoryFG.FROM_TXN_DATE_Calendar_IMG" border="0" class="absmiddlecalendar"></a>&nbsp;&nbsp;</span></span></span></p>

          
            
              
            
            
              
            
                        			
            
              
            
            
              
            
          <p id="SearchPanel.Rb3" class="formrow">
<span id="SearchPanel.Rb3.C1" class="querytextleftWithTab"><label for="TransactionHistoryFG.TO_TXN_DATE" id="txnDateToLabel" class="simpletext">Tanggal Akhir<span style="direction: rtl; unicode-bidi: embed">(dd-MMM-yyyy)</span>:</label></span><span id="SearchPanel.Rb3.C2" class="querytextright"><span class="datelabelColumn"><span class="datelabelColumn_border"><input type="Text" name="TransactionHistoryFG.TO_TXN_DATE" id="TransactionHistoryFG.TO_TXN_DATE" maxlength="11" value="" data-febatype="FEBADate" class="datetextbox type_FEBADate">&nbsp;<a href="#" title="Kalender" name="HREF_TransactionHistoryFG.TO_TXN_DATE" id="HREF_TransactionHistoryFG.TO_TXN_DATE"><img src="L002/consumer/images/calenderEndUser.gif" alt="Kalender" id="TransactionHistoryFG.TO_TXN_DATE_Calendar_IMG" border="0" class="absmiddlecalendar"></a>&nbsp;&nbsp;</span></span></span><span id="SearchPanel.Rb3.C3" class="querytextleft"><span class="simpletext">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span><span id="SearchPanel.Rb3.C4" class="querytextright"><label for="TranRequestManagerFG.TO_TXN_DATE" id="txnDateToLabel1" class="simpletext11">Maksimum rentang Tanggal Awal dan Akhir mutasi adalah 31 hari, dan harus masuk dalam periode 6 bulan transaksi terakhir.</label></span></p>

          
            
              
                
                
              
            
            
              
            
          <p id="SearchPanel.Rb4" class="formrow">
<span id="SearchPanel.Rb4.C1" class="querytextleft"><font class="absmiddletxt"><input type="radio" name="TransactionHistoryFG.SELECTED_RADIO_INDEX" value="1" checked="checked" class="absmiddle" id="TransactionHistoryFG.SELECTED_RADIO_INDEX" title="Pilih Periode Transaksi"></font><label for="TransactionHistoryFG.TXN_PERIOD" id="txnPeriodLabel" class="simpletext">Periode :</label></span><span id="SearchPanel.Rb4.C2" class="querytextright"><span class="labelColumn_combo"><span class="labelColumn_combo_brdr"> <select name="TransactionHistoryFG.TXN_PERIOD" class="dropdownexpandalbe" id="TransactionHistoryFG.TXN_PERIOD" title="Periode"> <option value="">Pilih</option> <option value="04">1 Bulan Terakhir</option> <option value="05">1 Minggu terakhir</option> <option selected="" value="06">Hari ini</option></select></span></span></span></p>

          
            
              
                
                
              
            
            
              
                
                
              
            
          
          
            
              
                
                
              
            
            
              
            
          <p id="SearchPanel.Rb6" class="formrow">
<span id="SearchPanel.Rb6.C1" class="querytextleft"><span class="simpletext">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><label for="TransactionHistoryFG.TXN_CATEGORY_ID" id="Categorylabel" title="Kategori" class="simpletext">Kategori:</label></span><span id="SearchPanel.Rb6.C2" class="querytextright"><span class="labelColumn_combo"><span class="labelColumn_combo_brdr"> <select name="TransactionHistoryFG.TXN_CATEGORY_ID" class="dropdownexpandalbe" id="TransactionHistoryFG.TXN_CATEGORY_ID" title="Kategori"> <option value="">Pilih</option> <option selected="" value="-1">Semua</option> <option value="0">Tanpa Kategori</option></select></span></span></span></p>

        </div>

      </div>
<!--end of subsection-->
    
  </div>

  <div class="section" id="NavPanel2">
    
      
        <div class="right" id="NavPanel2.Rowset1">
          
            
              
            
            
              
            
            
              
            
            
              
            
            
              
            
          <p id="NavPanel2.Ra1">
<span id="NavPanel2.Ra1.C1"><span class="simpletextright" id="Caption85468">Atur Template:</span></span><span id="NavPanel2.Ra1.C2"><span class="labelColumn_combo_small"><span class="labelColumn_combo_brdr_small"> <select name="TransactionHistoryFG.TEMPLATE_ACTION_TYPE" class="labelcolumncombosmall" id="TransactionHistoryFG.TEMPLATE_ACTION_TYPE" title="Atur Template"> <option value="">Pilih</option> <option value="Save Template">Simpan Template</option></select></span></span></span><span id="NavPanel2.Ra1.C3"><span class="HW_formbtn"><input type="Submit" name="Action.TEMPLATE_ACTION" class="formbtn" id="TEMPLATE_ACTION" value="OK"></span></span><span id="NavPanel2.Ra1.C4"><input type="Submit" name="Action.SEARCH" class="formbtn4" id="SEARCH" value="Cari" title="Cari"></span></p>

        </div>

      
    
  </div>

  <div class="section" id="ListTable">
    
      
        
          
            
              
            
          
        
      
    
  </div>

  
  
  <div class="section" id="NavPanel1">
    
      
        <div class="right" id="NavPanel1.Rowset1">
          
            
              
                
                
              
            
            
              
            
            
              
            
          <p id="NavPanel1.Ra1">
<span id="NavPanel1.Ra1.C3"><span class="HW_formbtn"><input type="Submit" name="Action.BACK" class="formbtn_last" id="BACK" value="Kembali"></span></span></p>

        </div>

      
    
  </div>

  <input type="Hidden" name="TransactionHistoryFG.CONTROLIDLISTING" value="TransactionListing" id="TransactionHistoryFG.CONTROLIDLISTING">
  <input type="Hidden" name="TransactionHistoryFG.MAPNAME" value="OpTransactionListingTpr" id="TransactionHistoryFG.MAPNAME">
 <input type="Hidden" name="FORMSGROUP_ID__" value="TransactionHistoryFG" id="FORMSGROUP_ID__">
 <input type="Hidden" name="TransactionHistoryFG.REPORTTITLE" value="OpTransactionHistoryTpr" id="TransactionHistoryFG.REPORTTITLE">

	<script src="scripts/initiate.js" type="text/javascript"></script>
<script language="javascript">
var tranTitle= document.getElementById("TranRequestManagerFG.REPORTTITLE").value;
if(tranTitle =="InitiatePayment" || tranTitle =="AddEntry")
{
initiate();
 jQuery("input[name=TranRequestManagerFG.DESTINATION_TYPE]:radio").change(function()
{
 initiate();
});
}
</script>





	
	<input type="Hidden" name="counterPartyNickName" value="" id="counterPartyNickName">
	
    <input type="Hidden" name="amountSendToCxps" value="" id="amountSendToCxps">
    
    <input type="Hidden" name="counterPartyTpe" value="" id="counterPartyTpe">
    
    <input type="Hidden" name="freqTyp" value="" id="freqTyp">
    
    <input type="Hidden" name="tranType" value="" id="tranType">
	<input type="Hidden" name="bankId" value="BNI01" id="bankId">
	<input type="Hidden" name="cxpsUserId" value="SULTHAN3003" id="cxpsUserId">
	<input type="Hidden" name="corpId" value="SULTHAN3003" id="corpId">
	<input type="Hidden" name="usertype" value="1" id="usertype">
	<input type="Hidden" name="RECEIVED_RESPONSE" value="" id="RECEIVED_RESPONSE">







<div id="CrossSellContainer"></div>
</div>
`


interface BankTransaction {
    bankCode: string;
    accountNum: string;
    transactionDate: Date;
    transactionType: "CR" | "DB"; // credit or debit
    transactionAmount: number;
    transactionName: string;
    externalId: string;
}

abstract class BaseBankScraper {
    abstract login(): void
    abstract getCurrentBalance(): Promise<number>
    abstract getTransactions(startAt: Date, endAt: Date): Promise<BankTransaction[]>
    abstract logout(): void
}

class BniBankScraper extends BaseBankScraper {
    accountId: string;
    password: string;
    loggedIn: boolean;
    browser: puppeteer.Browser;
    page: puppeteer.Page;
    maxCaptchaTrial: number;

    constructor(accountId: string, password: string) {
        super()
        this.accountId = accountId;
        this.password = password;
        this.maxCaptchaTrial = 20;
        this.loggedIn = false;
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: false
        });
        this.page = await this.browser.newPage();
    }

    async login() {
        try {
            await this.page.goto('https://ibank.bni.co.id');

            let trial = 0;
            let captchaText = "";
            console.log("captcha")
            while (trial < this.maxCaptchaTrial) {
                const captcha = await this.page.$('#IMAGECAPTCHA');
                const captchaImage = await captcha.screenshot();

                const { data: { text } } = await Tesseract.recognize(
                    captchaImage,
                    'eng',
                )

                if (text !== "") {
                    captchaText = text;
                    break;
                }

                await this.page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
                trial += 1
            }

            console.log("typing ", trial)
            console.log(captchaText)
            await this.page.type('#AuthenticationFG\\.ACCESS_CODE', this.password);
            await this.page.type('#AuthenticationFG\\.USER_PRINCIPAL', this.accountId);
            await this.page.type('#AuthenticationFG\\.VERIFICATION_CODE', captchaText);

            this.loggedIn = true;
            console.log("loggedIn")
        } catch (e) {
            console.log(e)
            await this.logout()
        }
    }

    async getCurrentBalance(): Promise<number> {
        try {
            if (this.loggedIn) {
                console.log("click rekening")
                await this.page.waitForSelector("#REKENING");
                await this.page.click("#REKENING")

                console.log("click saldo")
                await this.page.waitForSelector("#Informasi-Saldo--Mutasi_Saldo-Rekening");
                await this.page.click("#Informasi-Saldo--Mutasi_Saldo-Rekening")

                console.log("eval")
                await this.page.waitForSelector("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]");
                const currentBalance = await this.page.$eval("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]", el => el.innerHTML)
                return parseInt(currentBalance);
            }
            throw new Error("User is not logged in")
        } catch {
            await this.logout()
        }
    }

    async getTransactions(startAt: Date, endAt: Date): Promise<BankTransaction[]> {
        if (this.loggedIn) {
            console.log("click rekening")
            await this.page.waitForSelector("#REKENING");
            await this.page.click("#REKENING")

            console.log("click saldo")
            await this.page.waitForSelector("#Informasi-Saldo--Mutasi_Saldo-Rekening");
            await this.page.click("#Informasi-Saldo--Mutasi_Saldo-Rekening")

            console.log("balance")
            await this.page.waitForSelector("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]");
            await this.page.click("#HREF_AccountSummaryFG\\.BALANCE_ARRAY\\[0\\]")

            await this.page.waitForSelector("#HREF_AccountSummaryFG\\.ACCOUNT_NUMBER_ARRAY\\[0\\]")
            const accountNum = await this.page.$eval("#HREF_AccountSummaryFG\\.ACCOUNT_NUMBER_ARRAY\\[0\\]", el => el.innerHTML)

            console.log("transaction")
            await this.page.waitForSelector("#TRANSACTION_CATEGORIZATION");
            await this.page.click("#TRANSACTION_CATEGORIZATION")

            console.log("collapse")
            await this.page.waitForSelector("#SearchPanel\\.SubSection2\\.collapsibleImage");
            await this.page.click("#SearchPanel\\.SubSection2\\.collapsibleImage")

            console.log("radioSelect")
            await this.page.waitForSelector('[id=TransactionHistoryFG\\.SELECTED_RADIO_INDEX][value="0"]')
            await this.page.click('[id=TransactionHistoryFG\\.SELECTED_RADIO_INDEX][value="0"]')

            await this.page.type('#TransactionHistoryFG\\.FROM_TXN_DATE', moment(startAt).format("DD-MMM-YYYY"));
            await this.page.type('#TransactionHistoryFG\\.TO_TXN_DATE', moment(endAt).format("DD-MMM-YYYY"));

            console.log("clicking")
            await this.page.waitForSelector("#SEARCH");
            await this.page.click("#SEARCH")
            console.log("wait")
            await this.page.waitForNavigation()

            const tableDatas = await this.page.$$eval('#txnHistoryList tr.listwhiterow,.listgreyrow', rows => {
                return Array.from(rows, row => {
                    const rawColumns = row.querySelectorAll('td');
                    return Array.from(rawColumns, column => column.innerText);
                });
            });

            const transactions = tableDatas.map((data) => {
                const transactionDate = moment(data[1], "DD-MMM-YYYY").toDate()
                const transactionName = data[2]
                const transactionType = data[4].slice(0, 2).toUpperCase() as "CR" | "DB"
                const transactionAmount = parseFloat(data[5].replace(/,/g, ""))
                const externalId = md5(data[1] + data[2] + data[4] + data[5])

                return {
                    bankCode: "BNI",
                    accountNum,
                    transactionDate,
                    transactionType,
                    transactionAmount,
                    transactionName,
                    externalId,
                }
            })

            console.log(transactions)
            // #Action\.OpTransactionListingTpr_custom\.GOTO_NEXT__
            return transactions
        }
        return [];
    }

    async logout() {
        await this.page.waitForSelector("HREF_Logout");
        await this.page.click("#HREF_Logout")
        await this.page.waitForSelector("#LOG_OUT");
        await this.page.click("#LOG_OUT")
        await this.browser.close()
    }
}

const scraper = new BniBankScraper(process.env.ACCOUNT, process.env.PASSWORD);
scraper.init().then(() => scraper.login().then(() => scraper.getTransactions(moment('20-10-2022', 'DD-MM-YYYY').toDate(), new Date()).then(() => scraper.logout())))
