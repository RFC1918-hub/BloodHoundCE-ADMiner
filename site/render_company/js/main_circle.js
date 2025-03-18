
function toggleDiv(divId) {
  if (divId === "main_circle") {
    document.getElementById("main_circle").style.display = "block";
    document.getElementById("azure_circle").style.display = "none";



    $svg=$.extend(true, [], $("#Calque_1"));
    $("#Calque_1").remove();
    $("#main_circle").append($svg);

    document.getElementById("title-kerberos").style.display=""
    document.getElementById("title-msgraph").style.display="none"

    document.getElementById("global-rating-on-premise").style.display = "block";
    document.getElementById("global-rating-azure").style.display = "none";

    document.getElementById("right-col-on-prem").style.display = "block";
    document.getElementById("right-col-azure").style.display = "none";

    document.getElementById("main-tab-title-breakdown-on-premise").style.display = "block";
    document.getElementById("main-tab-title-breakdown-azure").style.display = "none";

    document.getElementById("stats-tab-title-overview").style.display = "block";
    document.getElementById("stats-tab-title-computers").style.display = "block";
    document.getElementById("stats-tab-title-users").style.display = "block";
    document.getElementById("stats-tab-title-os").style.display = "block";
    document.getElementById("stats-tab-title-azure").style.display = "none";

    document.getElementById("azure").classList.remove("active");

    document.getElementById("recap").classList.add("active");
    document.getElementById("recap").classList.add("show");
    document.getElementById("recap").classList.add("fade");
    
    // Update links to on-prem smolcards
    document.getElementById("switchCard_misc").onclick = function () {switchCards('misc')};
    document.getElementById("switchCard_permission").onclick = function () {switchCards('permissions')};
    document.getElementById("switchCard_kerberos_ms_graph").onclick = function () {switchCards('kerberos')};
    document.getElementById("switchCard_passwords").onclick = function () {switchCards('passwords')};

  }
  else {
    document.getElementById("main_circle").style.display = "none";
    document.getElementById("azure_circle").style.display = "block";

    $svg=$.extend(true, [], $("#Calque_1"));
    $("#Calque_1").remove();
    $("#azure_circle").append($svg);
    
    document.getElementById("title-kerberos").style.display="none"
    document.getElementById("title-msgraph").style.display=""

    document.getElementById("global-rating-on-premise").style.display = "none";
    document.getElementById("global-rating-azure").style.display = "block";

    document.getElementById("right-col-on-prem").style.display = "none";
    document.getElementById("right-col-azure").style.display = "block";

    document.getElementById("main-tab-title-breakdown-on-premise").style.display = "none";
    document.getElementById("main-tab-title-breakdown-azure").style.display = "block";

    document.getElementById("stats-tab-title-overview").style.display = "none";
    document.getElementById("stats-tab-title-computers").style.display = "none";
    document.getElementById("stats-tab-title-users").style.display = "none";
    document.getElementById("stats-tab-title-os").style.display = "none";
    document.getElementById("stats-tab-title-azure").style.display = "block";

    document.getElementById("azure").classList.add("active");

    document.getElementById("recap").classList.remove("active");
    document.getElementById("computers").classList.remove("active");
    document.getElementById("users").classList.remove("active");
    document.getElementById("os_distribution").classList.remove("active");

    // Update links to azure smolcards
    document.getElementById("switchCard_misc").onclick = function () {switchCards('az_misc');};
    document.getElementById("switchCard_permission").onclick = function () {switchCards('az_permissions')};
    document.getElementById("switchCard_kerberos_ms_graph").onclick = function () {switchCards('ms_graph')};
    document.getElementById("switchCard_passwords").onclick = function () {switchCards('az_passwords')};

  }
}


function display_one_hexagon(name, hexa_dict) {
  var color = hexa_dict.color;
  var x = hexa_dict.position[0];
  var y = hexa_dict.position[1];
  var link = hexa_dict.link;

  switch (color) {
    case 'red':
      var status =
        "<i class='bi bi-exclamation-diamond-fill' style='color: rgb(245, 75, 75); margin-right: 3px;'></i> Immediate risk";
      break;
    case 'orange':
      var status =
        "<i class='bi bi-exclamation-triangle-fill' style='color: rgb(245, 177, 75); margin-right: 3px;'></i> Potential risk";
      break;
    case 'yellow':
      var status =
        "<i class='bi bi-dash-circle-fill' style='color: rgb(255, 221, 0); margin-right: 3px;'></i> Minor risk";
      break;
    case 'green':
      var status =
        "<i class='bi bi-check-circle-fill' style='color: rgb(91, 180, 32); margin-right: 3px;'></i> Handled risk";
      break;
    default:
      var status =
        "<i class='bi bi-dash-circle-fill' style='color: rgb(133,135,150); margin-right: 3px;'></i> Risk not evaluated";
  }

  var style = `top: ${x}%; left: ${y}%`;

  var hexagon = `<a href="${link}">
        <img src="../icons/main_circle/hexagone_${color}.svg" class="hexagon hexagon-${color}" style="${style}" custom-title="${hexa_dict.title}" custom-status="${status}"/>
    </a>`;

  if (hexa_dict.category_repartition == "azure") {
    $('.azure_circle').append(hexagon);
  }
  else {
    $('.main_circle').append(hexagon);
  }
  
}

function display_all_hexagons(dico_entry) {
  // Display all icons
  for (var key in dico_entry) {
    display_one_hexagon(key, dico_entry[key]);
  }

  // Create main text
  var hexa_display = `
    <div class="hexa-main-div">
        <h5>HEXA NAME</h5>
        <br/>
        <p>STATUS</p>
    </div>`;
  $('.main_circle').append(hexa_display);
  $('.azure_circle').append(hexa_display);

  // Add event listener on hover for hexagons to display the main text

  const hexagons = document.querySelectorAll('.hexagon');

  hexagons.forEach((el) =>
    el.addEventListener('mouseover', (event) => {
      var div = document.querySelectorAll('.hexa-main-div');
      div.forEach(e => e.querySelector('h5').innerText = el.getAttribute('custom-title'));
      div.forEach(e => e.querySelector('p').innerHTML = el.getAttribute('custom-status'));
      div.forEach(e => e.style.opacity = 1);
    }),
  );

  const card_right = document.querySelectorAll('.threat-card');

  card_right.forEach((el) =>
    el.addEventListener('mouseover', (event) => {
      var div = document.querySelectorAll('.hexa-main-div');
      div.forEach(e => e.querySelector('h5').innerText = el.getAttribute('custom-title'));
      div.forEach(e => e.querySelector('p').innerHTML = el.getAttribute('custom-status'));
      div.forEach(e => e.style.opacity = 1);
    }),
  );

  card_right.forEach((el) =>
    el.addEventListener('mouseleave', (event) => {
      var div = document.querySelectorAll('.hexa-main-div');
      div.forEach(e => e.style.opacity = 0);
    }),
  );

  hexagons.forEach((el) =>
    el.addEventListener('mouseleave', (event) => {
      var div = document.querySelectorAll('.hexa-main-div');
      div.forEach(e => e.style.opacity = 0);
    }),
  );

  var title_permissions = `<a data-bs-toggle="modal" href="#cardsModal" onclick=switchCards('permissions')>
    <img src="../icons/main_circle/permissions.svg" class="title-section shadow" style="top:15%; left: 40%""/>
    </a>`;
  // $('.main_circle').append(title_permissions);

  var title_passwords = `<a data-bs-toggle="modal" href="#cardsModal" onclick=switchCards('passwords')>
        <img src="../icons/main_circle/passwords.svg" class="title-section shadow" style="top:62%; left: 10%""/>
    </a>`;
  // $('.main_circle').append(title_passwords);

  var title_kerberos = `<a data-bs-toggle="modal" href="#cardsModal" onclick=switchCards('kerberos')>
        <img src="../icons/main_circle/kerberos.svg" class="title-section shadow" style="top:62%; left: 70%;""/>
    </a>`;
  // $('.main_circle').append(title_kerberos);


  var title_misc = `<a data-bs-toggle="modal" href="#cardsModal" onclick=switchCards('misc')>
        <img src="../icons/main_circle/misc.svg" class="title-section shadow" style="top:80%; left: 45%;""/>
    </a>`;
  // $('.main_circle').append(title_misc);

}

var title_attack_paths = `<a data-bs-toggle="modal" href="#cardsModal" onclick=switchCards('attack_path')>
    <img src="../icons/main_circle/attack_paths.svg" class="title-section shadow" style="top:20%; left: 39%""/>
    </a>`;
// $('.azure_circle').append(title_attack_paths);


var title_ms_graph = `<a data-bs-toggle="modal" href="#cardsModal" onclick=switchCards('ms_graph')>
    <img src="../icons/main_circle/ms_graph.svg" class="title-section shadow" style="top:50%; left: 70%""/>
    </a>`;
// $('.azure_circle').append(title_ms_graph);

var title_service_principal = `<a data-bs-toggle="modal" href="#cardsModal" onclick=switchCards('sp_mi')>
    <img src="../icons/main_circle/service_principal.svg" class="title-section shadow" style="top:75%; left: 35%""/>
    </a>`;
// $('.azure_circle').append(title_service_principal);


var title_azure_ad_connect = `<a data-bs-toggle="modal" href="#cardsModal" onclick=switchCards('ad_connect')>
    <img src="../icons/main_circle/azure_ad_connect.svg" class="title-section shadow" style="top:50%; left: 2.4%""/>
    </a>`;
// $('.azure_circle').append(title_azure_ad_connect);

 var dico_entry = {"fgpp": {"color": "grey", "name": "Users FGPP", "category_repartition": "on_premise", "link": "fgpp.html", "category": "misc", "position": [86.69, 30.85], "title": "0 FGPP defined"}, "can_read_laps": {"color": "green", "name": "Access to LAPS passwords", "category_repartition": "on_premise", "link": "can_read_laps.html", "category": "passwords", "position": [52.63, 12.74], "title": "3 accounts can read LAPS passwords"}, "can_read_gmsapassword_of_adm": {"color": "green", "name": "Objects can read GMSA passwords of administrators", "category_repartition": "on_premise", "link": "can_read_gmsapassword_of_adm.html", "category": "passwords", "position": [54.05, 4.66], "title": "0 can read GMSA passwords of Administrators"}, "users_pwd_cleartext": {"color": "green", "name": "Users with cleartext passwords", "category_repartition": "on_premise", "link": "users_pwd_cleartext.html", "category": "passwords", "position": [60.25, 23.68], "title": "0 users with clear text password"}, "users_constrained_delegations": {"color": "green", "name": "Kerberos constrained delegation", "category_repartition": "on_premise", "link": "users_constrained_delegations.html", "category": "kerberos", "position": [73.54, 70.19], "title": "0 users with Kerberos constrained delegations"}, "users_shadow_credentials": {"color": "green", "name": "Shadow Credentials on privileged accounts", "category_repartition": "on_premise", "link": "users_shadow_credentials.html", "category": "kerberos", "position": [79.82, 75.46], "title": "0 users can impersonate privileged accounts"}, "users_admin_of_computers": {"color": "green", "name": "Users with local admin privileges", "category_repartition": "on_premise", "link": "users_admin_of_computers.html", "category": "permissions", "position": [39.7, 90.46], "title": "0 users with local admin privileges"}, "unpriv_to_dnsadmins": {"color": "green", "name": "Paths to DNS Admins", "category_repartition": "on_premise", "link": "unpriv_to_dnsadmins.html", "category": "permissions", "position": [40.37, 82.26], "title": "0 paths to DNSAdmins group"}, "pre_windows_2000_compatible_access_group": {"color": "green", "name": "\"Pre-Windows 2000 Compatible Access\" group", "category_repartition": "on_premise", "link": "pre_windows_2000_compatible_access_group.html", "category": "permissions", "position": [39.38, 74.06], "title": "0 inadequate membership users in Pre-Win 2000 Compatible Access group"}, "has_sid_history": {"color": "green", "name": "Objects with SID history", "category_repartition": "on_premise", "link": "has_sid_history.html", "category": "permissions", "position": [26.75, 86.26], "title": "0 objects with SID history"}, "computers_list_of_rdp_users": {"color": "green", "name": "RDP access (computers)", "category_repartition": "on_premise", "link": "computers_list_of_rdp_users.html", "category": "permissions", "position": [28.85, 78.07], "title": "0 computers with RDP access"}, "cross_domain_admin_privileges": {"color": "green", "name": "Users that have powerful cross-domain privileges", "category_repartition": "on_premise", "link": "cross_domain_admin_privileges.html", "category": "permissions", "position": [27.05, 66.95], "title": "0 accounts have cross-domain admin privileges"}, "users_rdp_access": {"color": "green", "name": "RDP access (users)", "category_repartition": "on_premise", "link": "users_rdp_access.html", "category": "permissions", "position": [15.74, 78.26], "title": "0 users with RDP access"}, "objects_to_adcs": {"color": "green", "name": "Non-tier 0 local admin privs on ADCS", "category_repartition": "on_premise", "link": "objects_to_adcs.html", "category": "permissions", "position": [19.46, 70.19], "title": "0 non-tier-0 with local admin privileges on ADCS"}, "objects_to_operators_member": {"color": "green", "name": "Paths to Operators Groups", "category_repartition": "on_premise", "link": "objects_to_operators_member.html", "category": "permissions", "position": [7.74, 67.25], "title": "0 paths to Operators Groups"}, "guest_accounts": {"color": "green", "name": "Guest accounts", "category_repartition": "on_premise", "link": "guest_accounts.html", "category": "permissions", "position": [13.33, 59.57], "title": "0 guests accounts are enabled"}, "computers_admin_of_computers": {"color": "green", "name": "Computers admin of other computers", "category_repartition": "on_premise", "link": "computers_admin_of_computers.html", "category": "permissions", "position": [19.94, 54.62], "title": "0 computers admin of 0 computers"}, "computers_members_high_privilege": {"color": "green", "name": "Machine accounts with inadequate privileges", "category_repartition": "on_premise", "link": "computers_members_high_privilege.html", "category": "permissions", "position": [3.54, 54.3], "title": "0 computers with high privs."}, "empty_ous": {"color": "green", "name": "OUs without any member", "category_repartition": "on_premise", "link": "empty_ous.html", "category": "misc", "position": [79.67, 35.43], "title": "0 OUs without any member"}, "vuln_functional_level": {"color": "green", "name": "Functional level of the domain", "category_repartition": "on_premise", "link": "vuln_functional_level.html", "category": "misc", "position": [73.06, 40.38], "title": "3 insufficient forest and domains functional levels"}, "computers_os_obsolete": {"color": "green", "name": "Computers with obsolete OS", "category_repartition": "on_premise", "link": "computers_os_obsolete.html", "category": "misc", "position": [89.63, 41.82], "title": "0 computers with obsolete OS"}, "rid_singularities": {"color": "green", "name": "Unexpected PrimaryGroupID", "category_repartition": "on_premise", "link": "rid_singularities.html", "category": "misc", "position": [81.8, 47.5], "title": "0 accounts with unknown RIDs or unexpected names"}, "azure_admin_on_prem": {"color": "green", "name": "Privileged accounts on both on-prem and AZ", "category_repartition": "azure", "link": "azure_admin_on_prem.html", "category": "az_permissions", "position": [21.54, 72.46], "title": "0 admins on Azure and on premise"}, "azure_roles": {"color": "green", "name": "Access to privileged Entra ID roles", "category_repartition": "azure", "link": "azure_roles.html", "category": "az_permissions", "position": [15.74, 78.26], "title": "0 users have access to Azure roles"}, "azure_users_paths_high_target": {"color": "green", "name": "Entra ID users with path high value targets", "category_repartition": "azure", "link": "azure_users_paths_high_target.html", "category": "az_permissions", "position": [19.0, 47.5], "title": "0 Users with a Path to High Value Targets"}, "azure_cross_ga_da": {"color": "green", "name": "Cross on-prem/Entra ID path to tier-0", "category_repartition": "azure", "link": "azure_cross_ga_da.html", "category": "az_permissions", "position": [21.54, 22.54], "title": "0 domain & tenant are cross compromisable"}, "azure_aadconnect_users": {"color": "green", "name": "Users possibly related to AADConnect", "category_repartition": "azure", "link": "azure_aadconnect_users.html", "category": "az_permissions", "position": [15.74, 16.74], "title": "0 users with AADConnect session"}, "azure_reset_passwd": {"color": "green", "name": "Entra ID password reset privileges", "category_repartition": "azure", "link": "azure_reset_passwd.html", "category": "az_passwords", "position": [64.15, 16.93], "title": "0 users can reset Entra ID password"}, "azure_last_passwd_change": {"color": "green", "name": "Incoherent last password change", "category_repartition": "azure", "link": "azure_last_passwd_change.html", "category": "az_passwords", "position": [68.25, 9.83], "title": "0 users have unusual last password change"}, "azure_dormant_accounts": {"color": "green", "name": "Azure dormant accounts", "category_repartition": "azure", "link": "azure_dormant_accounts.html", "category": "az_misc", "position": [81.8, 47.5], "title": "0 dormant accounts"}, "azure_accounts_disabled_on_prem": {"color": "green", "name": "Synced accounts with disabled twin account", "category_repartition": "azure", "link": "azure_accounts_disabled_on_prem.html", "category": "ms_graph", "position": [77.26, 78.26], "title": "0 Azure accounts are disabled on prem."}, "azure_accounts_not_found_on_prem": {"color": "green", "name": "Entra ID accounts not synced on-prem", "category_repartition": "azure", "link": "azure_accounts_not_found_on_prem.html", "category": "ms_graph", "position": [64.15, 78.07], "title": "0 Entra ID accounts are non-existant on-prem"}, "azure_ms_graph_controllers": {"color": "green", "name": "Direct Controllers of MS Graph", "category_repartition": "azure", "link": "azure_ms_graph_controllers.html", "category": "ms_graph", "position": [57.76, 89.52], "title": "0 paths to MS Graph controllers"}, "users_pwd_not_changed_since": {"color": "yellow", "name": "Users with old passwords", "category_repartition": "on_premise", "link": "users_pwd_not_changed_since.html", "category": "passwords", "position": [64.15, 16.93], "title": "55 unchanged passwords > 3 months"}, "computers_without_laps": {"color": "yellow", "name": "Computers without LAPS", "category_repartition": "on_premise", "link": "computers_without_laps.html", "category": "passwords", "position": [68.25, 9.83], "title": "94 % computers without LAPS"}, "users_password_not_required": {"color": "yellow", "name": "Password requirement bypass", "category_repartition": "on_premise", "link": "users_password_not_required.html", "category": "passwords", "position": [73.54, 24.81], "title": "2 users without password requirement"}, "up_to_date_admincount": {"color": "yellow", "name": "Inadequate AdminCount settings", "category_repartition": "on_premise", "link": "up_to_date_admincount.html", "category": "permissions", "position": [11.2, 47.5], "title": "0 priviledged accounts without admincount and 18 unpriviledged accounts with admincount"}, "empty_groups": {"color": "yellow", "name": "Groups without any member", "category_repartition": "on_premise", "link": "empty_groups.html", "category": "misc", "position": [89.63, 53.18], "title": "63 groups without any member"}, "never_expires": {"color": "orange", "name": "Users without password expiration", "category_repartition": "on_premise", "link": "never_expires.html", "category": "passwords", "position": [79.82, 19.54], "title": "64 users without password expiration"}, "as_rep": {"color": "orange", "name": "AS-REP Roastable accounts", "category_repartition": "on_premise", "link": "as_rep.html", "category": "kerberos", "position": [65.95, 66.95], "title": "1 accounts are AS-REP-roastable"}, "users_shadow_credentials_to_non_admins": {"color": "orange", "name": "Shadow Credentials on regular accounts", "category_repartition": "on_premise", "link": "users_shadow_credentials_to_non_admins.html", "category": "kerberos", "position": [64.15, 78.07], "title": "3 users can impersonate other accounts"}, "krb_last_change": {"color": "orange", "name": "Old KRBTGT password", "category_repartition": "on_premise", "link": "krb_last_change.html", "category": "kerberos", "position": [68.25, 85.17], "title": "krbtgt not updated in > 631 days"}, "nb_domain_admins": {"color": "orange", "name": "Inadequate number of domain admins", "category_repartition": "on_premise", "link": "nb_domain_admins.html", "category": "permissions", "position": [3.54, 40.7], "title": "16 domain admins"}, "computers_last_connexion": {"color": "orange", "name": "Ghost computers", "category_repartition": "on_premise", "link": "computers_last_connexion.html", "category": "misc", "position": [73.06, 54.62], "title": "20 ghost computers"}, "dormants_accounts": {"color": "orange", "name": "Dormant accounts", "category_repartition": "on_premise", "link": "dormants_accounts.html", "category": "misc", "position": [79.67, 59.57], "title": "49 dormant accounts"}, "kerberoastables": {"color": "red", "name": "Kerberoastable accounts", "category_repartition": "on_premise", "link": "kerberoastables.html", "category": "kerberos", "position": [53.62, 74.06], "title": "2 kerberoastable accounts"}, "non-dc_with_unconstrained_delegations": {"color": "red", "name": "Kerberos unconstrained delegations", "category_repartition": "on_premise", "link": "non-dc_with_unconstrained_delegations.html", "category": "kerberos", "position": [52.63, 82.26], "title": "1 objects with unconstrained delegations"}, "graph_list_objects_rbcd": {"color": "red", "name": "Kerberos RBCD against computers", "category_repartition": "on_premise", "link": "graph_list_objects_rbcd.html", "category": "kerberos", "position": [54.05, 90.34], "title": "2 users can perform an RBCD attack on 8 computers"}, "server_users_could_be_admin": {"color": "red", "name": "Paths to servers", "category_repartition": "on_premise", "link": "server_users_could_be_admin.html", "category": "permissions", "position": [19.94, 40.38], "title": "Up to 2 users can compromise servers"}, "privileged_accounts_outside_Protected_Users": {"color": "red", "name": "Privileged account outside the protected users group.", "category_repartition": "on_premise", "link": "privileged_accounts_outside_Protected_Users.html", "category": "permissions", "position": [13.33, 35.43], "title": "15 priviledged accounts not in Protected Users group"}, "can_dcsync": {"color": "red", "name": "Inadequate access to DCSync privileges", "category_repartition": "on_premise", "link": "can_dcsync.html", "category": "permissions", "position": [7.74, 27.75], "title": "18 non DA/DC objects have DCSync privileges"}, "users_GPO_access": {"color": "red", "name": "Inadequate GPO modifications privileges", "category_repartition": "on_premise", "link": "users_GPO_access.html", "category": "permissions", "position": [19.46, 24.81], "title": "32 GPO with inadequate modification privileges"}, "dangerous_paths": {"color": "red", "name": "Attack paths choke points", "category_repartition": "on_premise", "link": "dangerous_paths.html", "category": "permissions", "position": [27.05, 28.05], "title": "More than 2140 dangerous paths to DA"}, "dom_admin_on_non_dc": {"color": "red", "name": "Tier-0 violation (sessions)", "category_repartition": "on_premise", "link": "dom_admin_on_non_dc.html", "category": "permissions", "position": [15.74, 16.74], "title": "23 Tier-0 sessions on non-Tier-0 computers"}, "graph_path_objects_to_ou_handlers": {"color": "red", "name": "Paths to Organizational Units (OU)", "category_repartition": "on_premise", "link": "graph_path_objects_to_ou_handlers.html", "category": "permissions", "position": [28.85, 16.93], "title": "13 dangerous control paths over OUs"}, "da_to_da": {"color": "red", "name": "Cross-domain paths to Domain Admin", "category_repartition": "on_premise", "link": "da_to_da.html", "category": "permissions", "position": [26.75, 8.74], "title": "2 cross-domain paths to Domain Admin"}, "vuln_permissions_adminsdholder": {"color": "red", "name": "Paths to the AdminSDHolder container", "category_repartition": "on_premise", "link": "vuln_permissions_adminsdholder.html", "category": "permissions", "position": [39.38, 20.94], "title": "40 paths to an AdminSDHolder container"}, "anomaly_acl": {"color": "red", "name": "ACL anomalies", "category_repartition": "on_premise", "link": "anomaly_acl.html", "category": "permissions", "position": [40.37, 12.74], "title": "87 groups with potential ACL anomalies"}, "graph_path_objects_to_da": {"color": "red", "name": "Paths to Domain Admins", "category_repartition": "on_premise", "link": "graph_path_objects_to_da.html", "category": "permissions", "position": [39.7, 4.54], "title": "37 users have a path to DA"}, "dc_impersonation": {"color": "red", "name": "Shadow credentials on domain controllers", "category_repartition": "on_premise", "link": "dc_impersonation.html", "category": "misc", "position": [86.69, 64.15], "title": "1 paths to impersonate DCs"}} 

    display_all_hexagons(dico_entry);